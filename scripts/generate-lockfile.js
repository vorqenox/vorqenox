const { execSync } = require("child_process");

const projectDir = "/vercel/share/v0-project";

try {
  console.log("Running npm install --package-lock-only in " + projectDir);
  const output = execSync("npm install --package-lock-only --prefix " + projectDir, {
    cwd: projectDir,
    stdio: "pipe",
    encoding: "utf-8",
    env: { ...process.env, HOME: projectDir },
  });
  console.log(output);
  console.log("package-lock.json generated successfully.");
} catch (err) {
  console.error("npm install failed:", err.stderr || err.message);
  process.exit(1);
}
