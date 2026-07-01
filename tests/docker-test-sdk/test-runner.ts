// Usage: node test-runner.ts <compose-dir> <broker-url>
import { spawn, spawnSync } from "node:child_process";

const composeDir = process.argv[2];
const brokerUrl = process.argv[3];

if (!composeDir || !brokerUrl) {
  console.error("Usage: node test-runner.ts <compose-dir> <broker-url>");
  process.exit(1);
}

const stripAnsi = (s: string) => s.replace(/\x1b\[[0-9;]*m/g, "");

function cleanup() {
  console.log("Cleaning up test containers...");
  spawnSync("podman", [
    "compose",
    "-f",
    `tests/${composeDir}/compose.yaml`,
    "-f",
    "tests/docker-test-sdk/test-runner.yaml",
    "down",
  ]);
}

const podmanArgs = [
  "compose",
  "-f",
  `tests/${composeDir}/compose.yaml`,
  "-f",
  "tests/docker-test-sdk/test-runner.yaml",
  "up",
  "--force-recreate",
  "--abort-on-container-exit",
  "--timeout",
  "60",
];

// `script` allocates a PTY so the child (and grandchildren like vitest) see a
// TTY and line-buffer their output, preserving colors and true streaming.
//
// Alternatives considered:
//  - `stdio: "inherit"` with spawnSync: streams + colors, but no filtering.
//  - `node-pty` (native addon): cleanest PTY allocation, but requires a native
//    build dependency.
//  - `stdbuf -oL podman ...`: only affects direct children, not grandchildren
//    (vitest re-execs), so ineffective here.
const child = spawn(
  "script",
  [
    "-q",
    "-c",
    `podman ${podmanArgs.map((a) => `"${a}"`).join(" ")}`,
    "/dev/null",
  ],
  {
    stdio: ["pipe", "pipe", "pipe"],
    env: { ...process.env, NGSILD_BROKER_URL: brokerUrl },
  },
);

const timeout = setTimeout(() => {
  console.log(
    "Test runner timed out after 61 seconds, killing child process...",
  );
  child.kill("SIGTERM");
}, 61_000); // 61 sec safety net

const filterLine = (data: Buffer) => {
  const text = data.toString();
  for (const line of text.split("\r")) {
    for (const sub of line.split("\n")) {
      if (stripAnsi(sub).startsWith("[test-runner]")) {
        process.stdout.write(sub + "\n");
      }
    }
  }
};

child.stdout?.on("data", filterLine);
child.stderr?.on("data", filterLine);

child.on("close", (code) => {
  clearTimeout(timeout);
  cleanup();
  process.exitCode = code ?? 0;
});

process.on("SIGINT", () => {
  cleanup();
  process.exit();
});
process.on("SIGTERM", () => {
  cleanup();
  process.exit();
});
