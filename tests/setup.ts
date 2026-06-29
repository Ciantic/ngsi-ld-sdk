import { brokerUrl } from "./helpers";

// Ensure the env var that the generated SDK reads is set.
process.env.NGSILD_BROKER_URL = brokerUrl;
