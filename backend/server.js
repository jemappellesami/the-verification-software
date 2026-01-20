const http = require("http");
const { spawn } = require("child_process");

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
        const python = spawn(
          `${__dirname}/veriphix/.venv/bin/python`,
          ["veriphix_instance.py"],
          {
            cwd: __dirname,
            stdio: ["pipe", "pipe", "pipe"],
          }
        );

        let stdout = "";
        let stderr = "";

        python.stdout.on("data", (chunk) => {
          stdout += chunk.toString();
        });

        python.stderr.on("data", (chunk) => {
          stderr += chunk.toString();
        });

        python.on("error", (error) => {
          sendJson(res, 500, { error: "Failed to start Python process" });
          console.error("Python spawn error", error);
        });

        python.on("close", (code) => {
          if (stderr.trim()) {
            console.error("Python stderr:", stderr.trim());
          }
          if (code !== 0) {
            sendJson(res, 500, {
              error: "Python process failed",
              details: stderr.trim() || `Exit code ${code}`,
            });
            return;
          }
          try {
            const result = JSON.parse(stdout || "{}");
            sendJson(res, 200, {
              failedTestRounds: Number(result.failedTestRounds) || 0,
              resultBit: Number(result.resultBit) === 1 ? 1 : 0,
              correctValue:
                typeof result.correctValue === "number"
                  ? result.correctValue
                  : null,
              isMatch:
                typeof result.isMatch === "boolean" ? result.isMatch : null,
            });
          } catch (error) {
            console.error("Python stdout:", stdout.trim());
            sendJson(res, 500, { error: "Invalid response from Python" });
          }
        });

        python.stdin.write(JSON.stringify(payload));
        python.stdin.end();
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
