import type { Reporter, TestModule, TestRunEndReason } from "vitest/node";
import type { SerializedError } from "vitest";

export default class BrokerGatesReporter implements Reporter {
  async onTestRunEnd(
    testModules: ReadonlyArray<TestModule>,
    _unhandledErrors: ReadonlyArray<SerializedError>,
    _reason: TestRunEndReason,
  ) {
    // Gates are written to task.meta by gateBroker() in the worker, then
    // shipped to this main-process reporter via Vitest's RPC layer.
    const gates: Array<{ test: string; broker: string; reason: string }> = [];
    for (const mod of testModules) {
      for (const tc of mod.children.allTests()) {
        const mg = tc.meta().brokerGate;
        if (mg) {
          gates.push({
            test: tc.fullName,
            broker: mg.broker,
            reason: mg.reason,
          });
        }
      }
    }
    if (gates.length === 0) return;

    const pad = (s: string, n: number) => s.padEnd(n, " ");

    const reasonMax = Math.max(...gates.map((g) => g.reason.length), 6);
    const testMax = Math.max(...gates.map((g) => g.test.length), 4);

    const div = "=".repeat(72);
    const lines = [
      `\n  ${div}`,
      `  Broker gate summary`,
      `  ${div}`,
      `  ${pad("Broker", 10)}  ${pad("Reason", reasonMax)}  ${pad("Test", testMax)}`,
      `  ${"-".repeat(10)}  ${"-".repeat(reasonMax)}  ${"-".repeat(testMax)}`,
    ];

    const seen = new Set<string>();
    for (const gate of gates) {
      const key = `${gate.broker}|${gate.reason}|${gate.test}`;
      if (seen.has(key)) continue;
      seen.add(key);
      lines.push(
        `  ${pad(gate.broker, 10)}  ${pad(gate.reason, reasonMax)}  ${pad(gate.test, testMax)}`,
      );
    }

    lines.push(`  ${div}\n`);

    for (const line of lines) {
      console.log(line);
    }
  }
}
