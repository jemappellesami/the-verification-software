const http = require("http");

const PORT = process.env.PORT || 4000;

const sendJson = (res, statusCode, body) => {
  const payload = JSON.stringify(body);
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(payload);
};

const server = http.createServer((req, res) => {
  if (!req.url) {
    sendJson(res, 400, { error: "Missing URL" });
    return;
  }

  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end();
    return;
  }

  if (req.method === "POST" && req.url === "/api/delegate-verify") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      try {
        const payload = body ? JSON.parse(body) : {};
        const testRounds = Number(payload.testRounds) || 1;
        const safeTestRounds = Math.max(testRounds, 1);
        const failedTestRounds = Math.floor(Math.random() * safeTestRounds);
        const resultBit = Math.random() < 0.5 ? 0 : 1;
        sendJson(res, 200, { failedTestRounds, resultBit });
      } catch (error) {
        sendJson(res, 400, { error: "Invalid JSON payload" });
      }
    });
    return;
  }

  sendJson(res, 404, { error: "Not found" });
});

server.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
