export const COMMAND_TRACE_STORAGE_KEY = "ray-studio-command-trace";
export const COMMAND_TRACE_EVENT = "studio:command-trace";

export type CommandTrace = {
  command: string;
  label: string;
  href: string;
  meta: string;
  createdAt: number;
};

export function formatCommandTracePath(href: string) {
  return href.replace(/"/g, '\\"');
}

export function emitCommandTrace(trace: Omit<CommandTrace, "createdAt">) {
  if (typeof window === "undefined") {
    return;
  }

  const nextTrace: CommandTrace = {
    ...trace,
    createdAt: Date.now(),
  };

  try {
    window.sessionStorage.setItem(COMMAND_TRACE_STORAGE_KEY, JSON.stringify(nextTrace));
  } catch {
    // Command trace is a progressive enhancement. The user action should never depend on storage.
  }

  window.dispatchEvent(new CustomEvent(COMMAND_TRACE_EVENT, { detail: nextTrace }));
}
