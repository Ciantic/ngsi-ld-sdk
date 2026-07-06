import type { Reporter, TestModule, TestRunEndReason } from "vitest/node";
import type { SerializedError } from "vitest";
import { detectBroker } from "../helpers";

const ANSI_GRAY = "\x1b[90m";
const ANSI_DEFAULT = "\x1b[39m";

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

    const seen = new Set<string>();
    const lines: string[] = [];
    let broker = "";
    for (const gate of gates) {
      const key = `${gate.broker}|${gate.reason}|${gate.test}`;
      if (seen.has(key)) continue;
      seen.add(key);
      lines.push(` ${gate.reason} / ${ANSI_GRAY}${gate.test}${ANSI_DEFAULT}`);
      broker = gate.broker;
    }

    if (lines.length > 0) {
      console.log(
        `\nKnown broker quirks summary (${broker}, ${lines.length}):`,
      );
      for (const line of lines) {
        console.log(`- ${line}`);
      }
      console.log();
    }
  }
}
