const { execSync } = require("child_process");
const path = require("path");

const projectDir = path.resolve(__dirname, "..");

try {
  console.log("Running npm install --package-lock-only ...");
  const output = execSync("npm install --package-lock-only", {
    cwd: projectDir,
    stdio: "pipe",
    encoding: "utf-8",
  });
  console.log(output);
  console.log("package-lock.json generated successfully.");
} catch (err) {
  console.error("npm install failed:", err.stderr || err.message);
  process.exit(1);
}
