"use client";

import { Fragment, useMemo, useState } from "react";
import type { ReferralRow } from "@/lib/db/queries";

// ─── Style helpers ──────────────────────────────────────────────────────

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 14,
};

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "12px",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: "var(--text-soft)",
  borderBottom: "1px solid var(--rule)",
  background: "var(--card-alt)",
  cursor: "pointer",
  userSelect: "none",
  whiteSpace: "nowrap",
};

const tdStyle: React.CSSProperties = {
  padding: "12px",
  borderBottom: "1px solid var(--rule)",
  color: "var(--text)",
  verticalAlign: "top",
};

// ─── Helpers ────────────────────────────────────────────────────────────

function formatDate(iso: string | undefined | null): string {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function truncate(s: string | null | undefined, max = 80): string {
  if (!s) return "";
  if (s.length <= max) return s;
  return s.slice(0, max - 1) + "…";
}

type SortKey =
  | "submitted_at"
  | "name"
  | "email"
  | "referral_name"
  | "referral_email"
  | "referral_phone"
  | "relationship";

type SortDir = "asc" | "desc";

// ─── Component ─────────────────────────────────────────────────────────

export default function RowsTable({
  initialRows,
}: {
  initialRows: ReferralRow[];
}) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("submitted_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return initialRows;
    return initialRows.filter((r) => {
      const haystack = [
        r.submitted_at,
        r.name,
        r.email,
        r.referral_name,
        r.referral_email,
        r.referral_phone,
        r.relationship,
        r.note,
      ]
        .filter((v): v is string => typeof v === "string" && v.length > 0)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [initialRows, query]);

  const sorted = useMemo(() => {
    const rows = [...filtered];
    rows.sort((a, b) => {
      let av: string | number = "";
      let bv: string | number = "";
      if (sortKey === "submitted_at") {
        av = a.submitted_at ? new Date(a.submitted_at).getTime() : 0;
        bv = b.submitted_at ? new Date(b.submitted_at).getTime() : 0;
      } else {
        av = (a[sortKey] ?? "").toString().toLowerCase();
        bv = (b[sortKey] ?? "").toString().toLowerCase();
      }
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return rows;
  }, [filtered, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  const toggleExpand = (i: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const sortIndicator = (key: SortKey) => {
    if (sortKey !== key) return null;
    return (
      <span style={{ marginLeft: 4, color: "var(--teal)" }}>
        {sortDir === "asc" ? "▲" : "▼"}
      </span>
    );
  };

  return (
    <div>
      {/* Search bar */}
      <div style={{ marginBottom: 16 }}>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search referrals…"
          style={{
            width: "100%",
            maxWidth: 420,
            padding: "10px 14px",
            fontSize: 14,
            border: "1px solid var(--rule)",
            borderRadius: 4,
            background: "#fff",
            color: "var(--text)",
            outline: "none",
            fontFamily: "var(--font-body)",
          }}
        />
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle} onClick={() => toggleSort("submitted_at")}>
                Submitted At{sortIndicator("submitted_at")}
              </th>
              <th style={thStyle} onClick={() => toggleSort("name")}>
                Referrer Name{sortIndicator("name")}
              </th>
              <th style={thStyle} onClick={() => toggleSort("email")}>
                Referrer Email{sortIndicator("email")}
              </th>
              <th style={thStyle} onClick={() => toggleSort("referral_name")}>
                Referral Name{sortIndicator("referral_name")}
              </th>
              <th style={thStyle} onClick={() => toggleSort("referral_email")}>
                Referral Email{sortIndicator("referral_email")}
              </th>
              <th style={thStyle} onClick={() => toggleSort("referral_phone")}>
                Phone{sortIndicator("referral_phone")}
              </th>
              <th style={thStyle} onClick={() => toggleSort("relationship")}>
                Relationship{sortIndicator("relationship")}
              </th>
              <th style={{ ...thStyle, cursor: "default" }}>Note</th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  style={{
                    ...tdStyle,
                    textAlign: "center",
                    color: "var(--text-soft)",
                    padding: "32px 12px",
                  }}
                >
                  {query ? "No matching referrals." : "No referrals yet."}
                </td>
              </tr>
            )}
            {sorted.map((r, i) => {
              const isOpen = expanded.has(i);
              return (
                <Fragment key={i}>
                  <tr
                    onClick={() => toggleExpand(i)}
                    style={{
                      cursor: "pointer",
                      background: isOpen ? "var(--teal-dim)" : "transparent",
                      transition: "background .15s",
                    }}
                  >
                    <td style={tdStyle}>{formatDate(r.submitted_at)}</td>
                    <td style={tdStyle}>{r.name || "—"}</td>
                    <td style={tdStyle}>{r.email || "—"}</td>
                    <td style={tdStyle}>{r.referral_name || "—"}</td>
                    <td style={tdStyle}>{r.referral_email || "—"}</td>
                    <td style={tdStyle}>{r.referral_phone || "—"}</td>
                    <td style={tdStyle}>{r.relationship || "—"}</td>
                    <td style={tdStyle}>
                      {r.note ? truncate(r.note, 80) : "—"}
                    </td>
                  </tr>
                  {isOpen && r.note && (
                    <tr>
                      <td
                        colSpan={8}
                        style={{
                          ...tdStyle,
                          background: "var(--card-alt)",
                          padding: "16px 20px",
                        }}
                      >
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            letterSpacing: ".12em",
                            textTransform: "uppercase",
                            color: "var(--text-soft)",
                            marginBottom: 6,
                          }}
                        >
                          Full Note
                        </div>
                        <div
                          style={{
                            fontSize: 14,
                            lineHeight: 1.6,
                            whiteSpace: "pre-wrap",
                            color: "var(--text)",
                          }}
                        >
                          {r.note}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      <div
        style={{
          marginTop: 16,
          fontSize: 13,
          color: "var(--text-soft)",
        }}
      >
        Showing {sorted.length} of {initialRows.length} referrals
      </div>
    </div>
  );
}
