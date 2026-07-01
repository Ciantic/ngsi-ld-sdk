// Usage: node test-runner.ts <compose-dir> <broker-url>
import { spawn, spawnSync } from "node:child_process";

const composeDir = process.argv[2];
const brokerUrl = process.argv[3];

if (!composeDir || !brokerUrl) {
  console.error("Usage: node test-runner.ts <compose-dir> <broker-url>");
  process.exit(1);
}

const stripAnsi = (s: string) => s.replace(/\x1b\[[0-9;]*m/g, "");

const child = spawnSync(
  "podman",
  [
    "compose",
    "-f",
    `tests/${composeDir}/compose.yaml`,
    "-f",
    "tests/docker-test-sdk/test-runner.yaml",
    "up",
    "--abort-on-container-exit",
    "--timeout",
    "10",
  ],
  {
    stdio: "inherit",
    // stdio: ["pipe", "pipe", "pipe"],
    env: { ...process.env, NGSILD_BROKER_URL: brokerUrl },
    timeout: 11_000, // 11 sec safety net
  },
);
