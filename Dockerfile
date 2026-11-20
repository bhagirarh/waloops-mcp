# stdio MCP server that proxies to the hosted WALoops endpoint; set WALOOPS_API_KEY for key-gated tools.
FROM node:20-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev
COPY src ./src
COPY tools.json ./
ENV WALOOPS_MCP_URL=https://app.waloops.com/api/mcp.php
ENTRYPOINT ["node","src/index.js"]
