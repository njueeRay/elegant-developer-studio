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
