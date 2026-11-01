# WALoops MCP is a hosted server. This image bridges stdio to the hosted
# Streamable HTTP endpoint so stdio-only clients (and Glama checks) can use it.
# Optional: set WALOOPS_API_KEY to use key-gated tools.
FROM node:20-alpine
RUN npm install -g mcp-remote@0.1.29
ENV WALOOPS_MCP_URL=https://app.waloops.com/api/mcp.php
CMD ["sh", "-c", "if [ -n \"$WALOOPS_API_KEY\" ]; then exec mcp-remote \"$WALOOPS_MCP_URL\" --transport http-only --header \"X-API-Key:$WALOOPS_API_KEY\"; else exec mcp-remote \"$WALOOPS_MCP_URL\" --transport http-only; fi"]
