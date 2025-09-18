"use client";
import { useState, useMemo } from "react";
import type { Project } from "../_data/projects";
import { clsx } from "clsx";

const TABS = ["All","Embedded","AI/ML","Cloud","Full-Stack","Research","Game","Other"] as const;

export type FilterState = { tab: typeof TABS[number]; chips: string[]; query: string; };

export function useFilters(projects: Project[]) {
  const [state, setState] = useState<FilterState>({ tab: "All", chips: [], query: "" });

  const techUniverse = useMemo(() => {
    const set = new Set<string>();
    projects.forEach(p => p.tech.forEach(t => set.add(t)));
    return Array.from(set).sort();
  }, [projects]);

  const filtered = useMemo(() => {
    const q = state.query.trim().toLowerCase();
    return projects.filter(p => {
      const okTab = state.tab === "All" ? true : p.categories.includes(state.tab as Project["categories"][number]);
      const okChips = state.chips.length ? state.chips.every(c => p.tech.includes(c)) : true;
      const okQuery = q ? (p.title.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q)) : true;
      return okTab && okChips && okQuery;
    });
  }, [projects, state]);

  return { state, setState, techUniverse, filtered, TABS };
}

export function FiltersBar({ state, setState, techUniverse, TABS }: ReturnType<typeof useFilters>) {
  return (
    <div className="mb-6 space-y-3">
      <div role="tablist" className="flex flex-wrap gap-2">
        {TABS.map(tab => (
          <button
            key={tab}
            role="tab"
            aria-selected={state.tab === tab}
            onClick={() => setState(s => ({ ...s, tab }))}
            className={clsx(
              "rounded-xl px-3 py-1.5 text-sm border transition-colors",
              state.tab === tab
                ? "border-pink-400/30 bg-pink-400/10 text-pink-300"
                : "border-white/10 bg-white/5 text-white/70 hover:text-white"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <input
          placeholder="Search projects…"
          value={state.query}
          onChange={e => setState(s => ({ ...s, query: e.target.value }))}
          className="w-full md:w-64 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-500/30"
        />
        <div className="flex flex-wrap gap-2">
          {techUniverse.slice(0, 16).map(t => {
            const active = state.chips.includes(t);
            return (
              <button
                key={t}
                onClick={() =>
                  setState(s => ({ ...s, chips: active ? s.chips.filter(c => c !== t) : [...s.chips, t] }))
                }
                className={clsx(
                  "rounded-full border px-3 py-1 text-xs",
                  active
                    ? "border-pink-400/30 bg-pink-400/10 text-pink-300"
                    : "border-white/10 bg-white/5 text-white/70 hover:text-white"
                )}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
