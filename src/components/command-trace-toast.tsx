"use client";

import { Terminal, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  COMMAND_TRACE_EVENT,
  COMMAND_TRACE_STORAGE_KEY,
  type CommandTrace,
} from "@/lib/command-trace";

const TRACE_LIFETIME_MS = 2600;
const TRACE_MAX_AGE_MS = 5000;

function readStoredTrace() {
  try {
    const rawValue = window.sessionStorage.getItem(COMMAND_TRACE_STORAGE_KEY);

    if (!rawValue) {
      return null;
    }

    const trace = JSON.parse(rawValue) as CommandTrace;

    if (!trace.command || Date.now() - trace.createdAt > TRACE_MAX_AGE_MS) {
      window.sessionStorage.removeItem(COMMAND_TRACE_STORAGE_KEY);
      return null;
    }

    return trace;
  } catch {
    return null;
  }
}

export function CommandTraceToast() {
  const pathname = usePathname();
  const [trace, setTrace] = useState<CommandTrace | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }

    return readStoredTrace();
  });

  useEffect(() => {
    const onTrace = (event: Event) => {
      const detail = (event as CustomEvent<CommandTrace>).detail;

      if (detail?.command) {
        setTrace(detail);
      }
    };

    window.addEventListener(COMMAND_TRACE_EVENT, onTrace);

    return () => window.removeEventListener(COMMAND_TRACE_EVENT, onTrace);
  }, []);

  useEffect(() => {
    const restoreTimeout = window.setTimeout(() => {
      const storedTrace = readStoredTrace();

      if (storedTrace?.href !== pathname) {
        window.sessionStorage.removeItem(COMMAND_TRACE_STORAGE_KEY);
      }

      setTrace((currentTrace) => {
        if (storedTrace?.href === pathname) {
          return storedTrace;
        }

        return currentTrace?.href === pathname ? currentTrace : null;
      });
    }, 0);

    return () => window.clearTimeout(restoreTimeout);
  }, [pathname]);

  useEffect(() => {
    if (!trace) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setTrace(null);
      window.sessionStorage.removeItem(COMMAND_TRACE_STORAGE_KEY);
    }, TRACE_LIFETIME_MS);

    return () => window.clearTimeout(timeout);
  }, [trace]);

  if (!trace) {
    return null;
  }

  return (
    <div className="command-trace-toast" role="status" aria-live="polite" data-testid="command-trace-toast">
      <Terminal size={15} />
      <span>
        <code>{trace.command}</code>
        <small>{trace.meta}</small>
      </span>
      <button
        type="button"
        aria-label="Dismiss command trace"
        onClick={() => {
          setTrace(null);
          window.sessionStorage.removeItem(COMMAND_TRACE_STORAGE_KEY);
        }}
      >
        <X size={14} />
      </button>
    </div>
  );
}
