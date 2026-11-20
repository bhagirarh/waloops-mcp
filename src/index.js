#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const endpoint =
  process.env.WALOOPS_MCP_URL || "https://app.waloops.com/api/mcp.php";
let requestId = 0;

async function rpc(method, params) {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json, text/event-stream",
  };
  if (process.env.WALOOPS_API_KEY) {
    headers["X-API-Key"] = process.env.WALOOPS_API_KEY;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: ++requestId,
      method,
      params,
    }),
    signal: AbortSignal.timeout(30_000),
  });

  const contentType = response.headers.get("content-type") || "";
  let json;
  if (contentType.includes("text/event-stream")) {
    const dataLines = (await response.text())
      .split(/\r?\n/)
      .filter((line) => line.startsWith("data:"));
    if (dataLines.length === 0) {
      throw new Error("WALoops API returned no event data");
    }
    json = JSON.parse(dataLines[dataLines.length - 1].slice(5).trim());
  } else {
    json = await response.json();
  }

  if (json.error) {
    throw new Error(json.error.message);
  }
  return json.result;
}

async function loadStaticTools() {
  const contents = await readFile(new URL("../tools.json", import.meta.url), "utf8");
  const data = JSON.parse(contents);
  if (Array.isArray(data)) {
    return { tools: data };
  }
  if (Array.isArray(data.tools)) {
    return { tools: data.tools };
  }
  if (Array.isArray(data.result?.tools)) {
    return { tools: data.result.tools };
  }
  throw new Error("tools.json does not contain a tools array");
}

const server = new Server(
  { name: "waloops-mcp", version: "1.0.0" },
  { capabilities: { tools: {} } },
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  try {
    return await rpc("tools/list", {});
  } catch {
    return loadStaticTools();
  }
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    return await rpc("tools/call", {
      name: request.params.name,
      arguments: request.params.arguments,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      content: [{ type: "text", text: `WALoops API error: ${message}` }],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
