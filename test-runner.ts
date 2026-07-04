// Usage: node test-runner.ts <compose-dir> <broker-url> [test-filter]
import { spawn } from "node:child_process";

const composeDir = process.argv[2];
const brokerUrl = process.argv[3];
const testFilter = process.argv[4] ?? "";

if (!composeDir || !brokerUrl) {
  console.error(
    "Usage: node test-runner.ts <compose-dir> <broker-url> [test-filter]",
  );
  process.exit(1);
}

const stripAnsi = (s: string) => s.replace(/\x1b\[[0-9;]*m/g, "");

function cleanup() {
  console.log("Cleaning up test containers...");
  const proc = spawn(
    "podman",
    [
      "compose",
      "-f",
      `tests/${composeDir}/compose.yaml`,
      "-f",
      "tests/docker-test-sdk/test-runner.yaml",
      "down",
    ],
    {
      detached: true, // Run in background so we can exit immediately
      stdio: "ignore",
    },
  );
  // Running proc.unref(); here would allow the parent to exit immediately as
  // well, but I want to optionally wait for the cleanup to finish, so I don't
  // call unref() here.
}

const podmanArgs = [
  "compose",
  "-f",
  `tests/${composeDir}/compose.yaml`,
  "-f",
  "tests/docker-test-sdk/test-runner.yaml",
  "up",
  "--build",
  "--force-recreate",
  "--abort-on-container-exit",
  "--exit-code-from=test-runner",
  "--remove-orphans",
  "--timeout=60",
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
    env: {
      ...process.env,
      NGSILD_BROKER_URL: brokerUrl,
      NGSILD_TEST_FILTER: testFilter,
    },
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
  console.log("Received SIGINT, killing child process...");
  child.kill("SIGINT");
});
process.on("SIGTERM", () => {
  console.log("Received SIGTERM, killing child process...");
  child.kill("SIGTERM");
});
