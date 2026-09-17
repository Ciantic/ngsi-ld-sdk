declare var process: {
  env: Record<string, string | undefined>;
};

interface ImportMeta {
  env?: Record<string, string | undefined>;
}
