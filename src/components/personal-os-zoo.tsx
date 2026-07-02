"use client";

import Link from "next/link";
import { ArrowRight, Check, Copy, Sparkles } from "lucide-react";
import { useState } from "react";
import {
  askPrompts,
  personalOsFlaws,
  personalOsSignals,
  personalOsZooItems,
} from "@/data/personal-os";
import { writeToClipboard } from "@/lib/clipboard";

const statusLabel = {
  Adopted: "Adopted",
  Prototype: "Prototype",
  Guardrail: "Guardrail",
} as const;

export function PersonalOsZoo() {
  const [activePrompt, setActivePrompt] = useState(askPrompts[0]);
  const [copied, setCopied] = useState<string | null>(null);

  const copyCommand = async (command: string) => {
    await writeToClipboard(command);
    setCopied(command);
    window.setTimeout(() => setCopied((current) => (current === command ? null : current)), 1500);
  };

  return (
    <section className="personal-os-zoo" aria-labelledby="personal-os-zoo-title">
      <div className="personal-os-zoo-heading">
        <div>
          <p className="section-kicker blue">Personal OS Zoo</p>
          <h2 id="personal-os-zoo-title">A living homepage, not a dashboard.</h2>
          <p>
            A calibrated transfer from ursb.me: source-backed personal objects,
            guided questions, compact command grammar, and strict density guardrails.
          </p>
        </div>
        <Link href="/" className="personal-os-zoo-home">
          Inspect home slice
          <ArrowRight size={15} />
        </Link>
      </div>

      <div className="personal-os-signal-strip" aria-label="Personal OS signals">
        {personalOsSignals.map((signal) => {
          const Icon = signal.icon;

          return (
            <div key={signal.label}>
              <Icon size={15} />
              <span>{signal.label}</span>
              <strong>{signal.value}</strong>
            </div>
          );
        })}
      </div>

      <div className="personal-os-layout">
        <div className="personal-os-object-list" aria-label="Personal OS object grammar">
          {personalOsZooItems.map((item) => (
            <article key={item.name} className="personal-os-object-card">
              <div className="personal-os-object-topline">
                <span>{item.role}</span>
                <span data-status={item.status}>{statusLabel[item.status]}</span>
              </div>
              <h3>{item.name}</h3>
              <p>{item.transfer}</p>
              <dl>
                <div>
                  <dt>Reference</dt>
                  <dd>{item.source}</dd>
                </div>
                <div>
                  <dt>Target</dt>
                  <dd>{item.target}</dd>
                </div>
              </dl>
              <button
                type="button"
                className="personal-os-command-copy"
                data-testid={`personal-os-copy-${item.name.toLowerCase()}`}
                onClick={() => copyCommand(item.command)}
              >
                {copied === item.command ? <Check size={14} /> : <Copy size={14} />}
                <code>{item.command}</code>
              </button>
            </article>
          ))}
        </div>

        <aside className="ask-terminal-zoo" aria-label="Ask Me Terminal calibration">
          <div className="ask-terminal-frame">
            <div className="ask-terminal-topline">
              <span>ask.ray</span>
              <span>guided / no fake omniscience</span>
            </div>
            <div className="ask-terminal-prompts">
              {askPrompts.map((prompt) => (
                <button
                  type="button"
                  key={prompt.id}
                  data-active={activePrompt.id === prompt.id}
                  onClick={() => setActivePrompt(prompt)}
                >
                  {prompt.label}
                </button>
              ))}
            </div>
            <div className="ask-terminal-response" data-testid="personal-os-zoo-response">
              <span>{">"} {activePrompt.command}</span>
              <p>{activePrompt.response}</p>
              <Link href={activePrompt.href}>
                Open route
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          <div className="personal-os-flaw-ledger">
            <div className="personal-os-flaw-title">
              <Sparkles size={16} />
              <strong>Flaw ledger</strong>
            </div>
            {personalOsFlaws.map((flaw) => (
              <article key={flaw.name}>
                <span>{flaw.status}</span>
                <h3>{flaw.name}</h3>
                <p>{flaw.symptom}</p>
                <small>{flaw.correction}</small>
              </article>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
