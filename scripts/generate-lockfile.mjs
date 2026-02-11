import { execSync } from "child_process";

try {
  console.log("Generating package-lock.json with npm...");
  execSync("npm install --package-lock-only --legacy-peer-deps", {
    cwd: "/vercel/share/v0-project",
    stdio: "inherit",
  });
  console.log("package-lock.json generated successfully.");
} catch (err) {
  console.error("Error generating lockfile:", err.message);
  process.exit(1);
}
