"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import {
  Activity, ArrowDownToLine, ArrowUpRight, Building2, CalendarClock, Check, ChevronLeft,
  ChevronRight, Clock3, Filter, LogOut, Mail, MapPin, MessageCircle, Plus, RefreshCw,
  Phone, Search, Sparkles, Users, X,
} from "lucide-react";
import type { DemoRequestActivity, DemoRequestPriority, DemoRequestRecord, DemoRequestStatus } from "@/lib/demo-requests-db";

const PAGE_SIZE = 50;
const statuses: DemoRequestStatus[] = ["new", "contacted", "qualified", "closed"];
const priorities: DemoRequestPriority[] = ["normal", "high", "urgent"];
const statusLabels: Record<DemoRequestStatus, string> = { new: "New", contacted: "Contacted", qualified: "Qualified", closed: "Closed" };
const priorityLabels: Record<DemoRequestPriority, string> = { normal: "Normal", high: "High", urgent: "Urgent" };
const packageLabels = { silver: "Silver", bronze: "Bronze", gold: "Gold", consultation: "Free consultation" };
const statusStyles: Record<DemoRequestStatus, string> = {
  new: "bg-sky-400/10 text-sky-200 ring-sky-300/20",
  contacted: "bg-violet-400/10 text-violet-200 ring-violet-300/20",
  qualified: "bg-amber-300/10 text-amber-200 ring-amber-300/20",
  closed: "bg-emerald-400/10 text-emerald-200 ring-emerald-300/20",
};
const priorityStyles: Record<DemoRequestPriority, string> = {
  normal: "text-white/50",
  high: "text-amber-200",
  urgent: "text-rose-300",
};

function localDateInput(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  return new Date(date.getTime() - date.getTimezoneOffset() * 60_000).toISOString().slice(0, 16);
}

function csvCell(value: unknown) {
  const raw = String(value ?? "");
  const text = /^[\s]*[=+@-]/.test(raw) ? `'${raw}` : raw;
  return `"${text.replaceAll('"', '""')}"`;
}

function StatusBadge({ status }: { status: DemoRequestStatus }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[status]}`}>{statusLabels[status]}</span>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="grid gap-1.5 text-xs font-medium text-white/45">{label}{children}</label>;
}

const inputClass = "w-full rounded-xl border border-white/10 bg-[#101013] px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-amber-300/60";

export default function AdminCrm() {
  const [authState, setAuthState] = useState<"checking" | "signed-out" | "signed-in">("checking");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [leads, setLeads] = useState<DemoRequestRecord[]>([]);
  const [counts, setCounts] = useState<Record<DemoRequestStatus, number>>({ new: 0, contacted: 0, qualified: 0, closed: 0 });
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activities, setActivities] = useState<DemoRequestActivity[]>([]);
  const [newNote, setNewNote] = useState("");
  const [showCreate, setShowCreate] = useState(false);
  const [showEditLead, setShowEditLead] = useState(false);
  const [busy, setBusy] = useState(false);
  const [savingNew, setSavingNew] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const selectedLead = leads.find((lead) => lead.id === selectedId) ?? null;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const openCount = counts.new + counts.contacted + counts.qualified;
  const visibleRange = total === 0 ? "0" : `${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, total)}`;

  const loadLeads = useCallback(async (targetPage = page, targetStatus = statusFilter, targetSearch = debouncedSearch) => {
    setBusy(true);
    setError("");
    try {
      const params = new URLSearchParams({ page: String(targetPage), status: targetStatus, q: targetSearch });
      const response = await fetch(`/api/admin/leads?${params}`, { cache: "no-store" });
      if (response.status === 401) {
        setAuthState("signed-out");
        return;
      }
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not load leads.");
      setLeads(result.leads);
      setCounts(result.counts);
      setTotal(result.total);
      setAuthState("signed-in");
      setSelectedId((current) => result.leads.some((lead: DemoRequestRecord) => lead.id === current) ? current : result.leads[0]?.id ?? null);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Could not load leads.");
    } finally {
      setBusy(false);
    }
  }, [page, statusFilter, debouncedSearch]);

  useEffect(() => { void loadLeads(1, "all", ""); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(search.trim()), 250);
    return () => window.clearTimeout(timer);
  }, [search]);
  useEffect(() => {
    if (authState === "signed-in") void loadLeads(page, statusFilter, debouncedSearch);
  }, [authState, page, statusFilter, debouncedSearch, loadLeads]);

  useEffect(() => {
    if (authState !== "signed-in") return;
    let active = true;
    const verifySession = async () => {
      try {
        const response = await fetch("/api/admin/session", { cache: "no-store" });
        if (!active || response.status !== 401) return;
        setAuthState("signed-out");
        setLeads([]);
        setCounts({ new: 0, contacted: 0, qualified: 0, closed: 0 });
        setTotal(0);
        setSelectedId(null);
        setActivities([]);
        setError("Your admin session is no longer valid. Sign in again with the current password.");
      } catch {
        // A temporary network error should not sign the admin out.
      }
    };
    const interval = window.setInterval(() => void verifySession(), 15_000);
    window.addEventListener("focus", verifySession);
    return () => {
      active = false;
      window.clearInterval(interval);
      window.removeEventListener("focus", verifySession);
    };
  }, [authState]);

  const loadActivities = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/admin/leads/${id}/activities`, { cache: "no-store" });
      const result = await response.json();
      if (response.ok) setActivities(result.activities);
      else setActivities([]);
    } catch { setActivities([]); }
  }, []);

  useEffect(() => {
    if (authState === "signed-in" && selectedLead) void loadActivities(selectedLead.id);
    else setActivities([]);
  }, [authState, selectedLead?.id, loadActivities]);

  const submitLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Sign in failed.");
      setUsername("");
      setPassword("");
      setAuthState("signed-in");
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Sign in failed.");
    } finally { setBusy(false); }
  };

  const updateLead = async (updates: {
    first_name?: string; last_name?: string; email?: string; phone_number?: string; business_type?: string;
    source?: string; address?: string; package_type?: "silver" | "bronze" | "gold" | "consultation"; message?: string;
    status?: DemoRequestStatus; priority?: DemoRequestPriority; follow_up_at?: string | null; admin_notes?: string;
  }) => {
    if (!selectedLead) return false;
    setBusy(true); setError(""); setNotice("");
    try {
      const response = await fetch("/api/admin/leads", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: selectedLead.id, ...updates }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not update this lead.");
      setLeads((current) => current.map((lead) => lead.id === result.lead.id ? result.lead : lead));
      setNotice("Changes saved.");
      await loadActivities(selectedLead.id);
      if (updates.status && statusFilter !== "all" && updates.status !== statusFilter) {
        if (leads.length === 1 && page > 1) setPage((current) => current - 1);
        else await loadLeads(page, statusFilter, debouncedSearch);
      }
      return true;
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Could not update this lead.");
      return false;
    } finally { setBusy(false); }
  };

  const saveEditedLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const saved = await updateLead(values as Parameters<typeof updateLead>[0]);
    if (saved) setShowEditLead(false);
  };

  const addNote = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedLead || !newNote.trim()) return;
    setBusy(true); setError("");
    try {
      const response = await fetch(`/api/admin/leads/${selectedLead.id}/activities`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ details: newNote.trim() }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not add note.");
      setNewNote("");
      setActivities((current) => [result.activity, ...current]);
      setNotice("Note added to the activity history.");
    } catch (noteError) {
      setError(noteError instanceof Error ? noteError.message : "Could not add note.");
    } finally { setBusy(false); }
  };

  const createLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    setSavingNew(true); setError("");
    try {
      const response = await fetch("/api/admin/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not create lead.");
      setShowCreate(false);
      setStatusFilter("all"); setSearch(""); setDebouncedSearch(""); setPage(1);
      setSelectedId(result.lead.id);
      setNotice("Lead created.");
      await loadLeads(1, "all", "");
    } catch (createError) {
      setError(createError instanceof Error ? createError.message : "Could not create lead.");
    } finally { setSavingNew(false); }
  };

  const exportCsv = async () => {
    setBusy(true); setError("");
    try {
      const rows: DemoRequestRecord[] = [];
      for (let targetPage = 1; targetPage <= totalPages; targetPage += 1) {
        const params = new URLSearchParams({ page: String(targetPage), status: statusFilter, q: debouncedSearch });
        const response = await fetch(`/api/admin/leads?${params}`, { cache: "no-store" });
        if (!response.ok) throw new Error("Could not export leads.");
        const result = await response.json();
        rows.push(...result.leads);
      }
      const columns: Array<[string, (lead: DemoRequestRecord) => string]> = [
        ["Created", (lead) => lead.created_at], ["First name", (lead) => lead.first_name], ["Last name", (lead) => lead.last_name],
        ["Email", (lead) => lead.email], ["Phone", (lead) => lead.phone_number], ["Business type", (lead) => lead.business_type],
        ["Source", (lead) => lead.source], ["Package", (lead) => packageLabels[lead.package_type]], ["Status", (lead) => statusLabels[lead.status]],
        ["Priority", (lead) => priorityLabels[lead.priority]], ["Follow-up", (lead) => lead.follow_up_at ?? ""], ["Address", (lead) => lead.address], ["Message", (lead) => lead.message],
      ];
      const content = [columns.map(([heading]) => csvCell(heading)).join(","), ...rows.map((lead) => columns.map(([, value]) => csvCell(value(lead))).join(","))].join("\r\n");
      const url = URL.createObjectURL(new Blob([`\uFEFF${content}`], { type: "text/csv;charset=utf-8" }));
      const link = document.createElement("a"); link.href = url; link.download = `vbn-crm-leads-${new Date().toISOString().slice(0, 10)}.csv`; link.click(); URL.revokeObjectURL(url);
      setNotice(`Exported ${rows.length} lead${rows.length === 1 ? "" : "s"}.`);
    } catch (exportError) {
      setError(exportError instanceof Error ? exportError.message : "Could not export leads.");
    } finally { setBusy(false); }
  };

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthState("signed-out"); setLeads([]); setSelectedId(null); setActivities([]);
  };

  const phoneDigits = selectedLead?.phone_number.replace(/\D/g, "") ?? "";
  const cards = [
    { label: "All leads", value: Object.values(counts).reduce((sum, number) => sum + number, 0), icon: Users, tint: "text-amber-200" },
    { label: "New", value: counts.new, icon: Sparkles, tint: "text-sky-200" },
    { label: "In progress", value: openCount, icon: Activity, tint: "text-violet-200" },
    { label: "Closed", value: counts.closed, icon: Check, tint: "text-emerald-200" },
  ];

  if (authState === "checking") return <main dir="ltr" className="grid min-h-screen place-items-center bg-[#0b0b0e] text-sm text-white/50">Loading CRM…</main>;

  if (authState === "signed-out") return (
    <main dir="ltr" className="grid min-h-screen place-items-center bg-[#0b0b0e] px-4 py-10 text-white">
      <section className="w-full max-w-md rounded-3xl border border-white/10 bg-[#151519] p-8 shadow-[0_30px_120px_rgba(0,0,0,.5)]">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-300 text-lg font-black text-[#19150b]">V+</div>
        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.24em] text-amber-200">VBN+ workspace</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Sign in to CRM</h1>
        <p className="mt-2 text-sm leading-6 text-white/50">Manage your sales pipeline, follow-ups, and customer conversations.</p>
        <form className="mt-7 space-y-4" onSubmit={submitLogin}>
          <Field label="Username"><input type="text" autoComplete="username" autoCapitalize="none" required minLength={2} maxLength={80} value={username} onChange={(event) => setUsername(event.target.value)} className={inputClass} /></Field>
          <Field label="Admin password"><input type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} className={inputClass} /></Field>
          {error && <p role="alert" className="rounded-xl bg-rose-400/10 p-3 text-sm text-rose-200">{error}</p>}
          <button type="submit" disabled={busy} className="w-full rounded-xl bg-amber-300 px-4 py-3 font-semibold text-[#17130a] transition hover:bg-amber-200 disabled:opacity-60">{busy ? "Signing in…" : "Continue to CRM"}</button>
        </form>
        <p className="mt-6 text-center text-xs text-white/30">Private VBN+ team workspace</p>
      </section>
    </main>
  );

  return (
    <main dir="ltr" className="min-h-screen bg-[#0b0b0e] text-white">
      <div className="mx-auto max-w-[1600px] px-4 pb-12 pt-5 sm:px-7 lg:px-10">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-5">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-amber-300 text-sm font-black text-[#19150b]">V+</div>
            <div><p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/40">VBN+ workspace</p><h1 className="mt-1 text-xl font-semibold">Sales CRM</h1></div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => void exportCsv()} disabled={busy || total === 0} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3.5 py-2.5 text-sm text-white/75 transition hover:bg-white/[0.06] disabled:opacity-40"><ArrowDownToLine size={16} />Export CSV</button>
            <button onClick={() => void loadLeads()} disabled={busy} aria-label="Refresh leads" className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-white/65 transition hover:bg-white/[0.06] disabled:opacity-40"><RefreshCw size={16} className={busy ? "animate-spin" : ""} /></button>
            <button onClick={logout} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-3.5 py-2.5 text-sm text-white/65 transition hover:bg-white/[0.06]"><LogOut size={16} /><span className="hidden sm:inline">Sign out</span></button>
          </div>
        </header>

        <section className="flex flex-wrap items-end justify-between gap-4 pb-6 pt-8">
          <div><div className="flex items-center gap-2 text-xs text-white/40"><span>Workspace</span><ChevronRight size={13} /><span className="text-white/70">Leads</span></div><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Lead management</h2><p className="mt-2 text-sm text-white/45">Keep every prospect moving toward a decision.</p></div>
          <button onClick={() => { setError(""); setShowCreate(true); }} className="inline-flex items-center gap-2 rounded-xl bg-amber-300 px-4 py-3 text-sm font-semibold text-[#17130a] shadow-[0_8px_30px_rgba(232,189,69,.12)] transition hover:bg-amber-200"><Plus size={17} />Add lead</button>
        </section>

        {error && <div role="alert" className="mb-5 flex items-start justify-between gap-4 rounded-xl border border-rose-300/15 bg-rose-400/[0.08] px-4 py-3 text-sm text-rose-100"><span>{error}</span><button onClick={() => setError("")} aria-label="Dismiss error"><X size={16} /></button></div>}
        {notice && <div role="status" className="mb-5 flex items-center justify-between gap-4 rounded-xl border border-emerald-300/15 bg-emerald-400/[0.07] px-4 py-3 text-sm text-emerald-100"><span>{notice}</span><button onClick={() => setNotice("")} aria-label="Dismiss notice"><X size={16} /></button></div>}

        <section className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {cards.map(({ label, value, icon: Icon, tint }) => <article key={label} className="rounded-2xl border border-white/[0.08] bg-[#141418] p-4 sm:p-5"><div className="flex items-center justify-between"><span className="text-sm text-white/48">{label}</span><Icon size={17} className={tint} /></div><p className="mt-4 text-3xl font-semibold tracking-tight">{value}</p></article>)}
        </section>

        <section className="mt-6 grid min-h-[650px] gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(360px,.8fr)]">
          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#121216]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-4 sm:px-5">
              <div><h3 className="font-semibold">Leads</h3><p className="mt-1 text-xs text-white/40">{visibleRange} of {total} matching records</p></div>
              <span className="inline-flex items-center gap-1.5 text-xs text-white/35"><span className={`h-1.5 w-1.5 rounded-full ${busy ? "bg-amber-300" : "bg-emerald-300"}`} />{busy ? "Syncing" : "Up to date"}</span>
            </div>
            <div className="flex flex-col gap-2 border-b border-white/[0.06] p-3 sm:flex-row sm:p-4">
              <label className="relative min-w-0 flex-1"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" /><input aria-label="Search leads" placeholder="Search people, email, phone, business…" value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} className={`${inputClass} pl-9`} /></label>
              <label className="relative"><Filter size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/35" /><select aria-label="Filter leads by status" value={statusFilter} onChange={(event) => { setStatusFilter(event.target.value); setPage(1); }} className={`${inputClass} min-w-40 appearance-none pl-9`}><option value="all">All statuses</option>{statuses.map((status) => <option key={status} value={status}>{statusLabels[status]}</option>)}</select></label>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-white/[0.025] text-[11px] uppercase tracking-[0.12em] text-white/35"><tr><th className="px-5 py-3 font-medium">Lead</th><th className="px-4 py-3 font-medium">Package</th><th className="px-4 py-3 font-medium">Stage</th><th className="px-4 py-3 font-medium">Priority</th><th className="px-4 py-3 font-medium">Follow-up</th></tr></thead>
                <tbody className="divide-y divide-white/[0.05]">
                  {leads.map((lead) => <tr key={lead.id} onClick={() => setSelectedId(lead.id)} className={`cursor-pointer transition hover:bg-white/[0.035] ${selectedId === lead.id ? "bg-amber-300/[0.045]" : ""}`}>
                    <td className="px-5 py-4"><div className="flex min-w-56 items-center gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-xs font-semibold text-amber-100">{lead.first_name.slice(0, 1)}{lead.last_name.slice(0, 1)}</span><span className="min-w-0"><span className="block truncate font-medium text-white/90">{lead.first_name} {lead.last_name}</span><span className="mt-1 block truncate text-xs text-white/40">{lead.email}</span></span></div></td>
                    <td className="px-4 py-4"><span className="block">{packageLabels[lead.package_type]}</span><span className="mt-1 block text-xs text-white/40">{lead.business_type}</span></td>
                    <td className="px-4 py-4"><StatusBadge status={lead.status} /></td>
                    <td className={`px-4 py-4 text-xs font-medium ${priorityStyles[lead.priority]}`}>{lead.priority === "urgent" ? "● " : lead.priority === "high" ? "● " : "○ "}{priorityLabels[lead.priority]}</td>
                    <td className="px-4 py-4 text-xs text-white/55">{lead.follow_up_at ? new Date(lead.follow_up_at).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "—"}</td>
                  </tr>)}
                  {leads.length === 0 && <tr><td colSpan={5} className="px-5 py-16 text-center"><div className="mx-auto grid h-11 w-11 place-items-center rounded-2xl bg-white/[0.04] text-white/35"><Users size={18} /></div><p className="mt-4 font-medium text-white/70">{busy ? "Loading leads…" : "No leads match this view"}</p><p className="mt-1 text-xs text-white/35">Try changing the search or add a lead manually.</p></td></tr>}
                </tbody>
              </table>
            </div>
            <footer className="flex items-center justify-between border-t border-white/[0.07] px-4 py-3 sm:px-5"><span className="text-xs text-white/35">Page {page} of {totalPages}</span><div className="flex gap-2"><button aria-label="Previous page" disabled={page <= 1 || busy} onClick={() => setPage((current) => Math.max(1, current - 1))} className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-white/65 disabled:opacity-30"><ChevronLeft size={16} /></button><button aria-label="Next page" disabled={page >= totalPages || busy} onClick={() => setPage((current) => Math.min(totalPages, current + 1))} className="grid h-8 w-8 place-items-center rounded-lg border border-white/10 text-white/65 disabled:opacity-30"><ChevronRight size={16} /></button></div></footer>
          </div>

          <aside className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#121216]">
            {!selectedLead ? <div className="grid min-h-[650px] place-items-center px-6 text-center"><div><div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl border border-white/10 text-white/35"><Users size={20} /></div><p className="mt-4 text-sm font-medium text-white/70">Select a lead</p><p className="mt-1 max-w-56 text-xs leading-5 text-white/35">Customer details, next steps, and the conversation history will appear here.</p></div></div> : <>
              <div className="flex items-start justify-between border-b border-white/[0.07] p-5"><div><div className="flex items-center gap-2"><StatusBadge status={selectedLead.status} /><span className="text-[10px] uppercase tracking-[0.14em] text-white/35">{packageLabels[selectedLead.package_type]}</span></div><h3 className="mt-3 text-xl font-semibold">{selectedLead.first_name} {selectedLead.last_name}</h3><p className="mt-1 text-xs text-white/40">Added {new Date(selectedLead.created_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p></div><div className="flex items-center gap-2"><button onClick={() => setShowEditLead(true)} className="rounded-lg border border-white/10 px-3 py-2 text-xs text-white/70 hover:bg-white/[0.05]">Edit details</button><button onClick={() => setSelectedId(null)} aria-label="Close lead details" className="grid h-8 w-8 place-items-center rounded-lg text-white/35 hover:bg-white/[0.06] hover:text-white"><X size={16} /></button></div></div>
              <div className="flex gap-2 border-b border-white/[0.07] p-4"><a href={`mailto:${selectedLead.email}`} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 py-2.5 text-xs text-white/75 hover:bg-white/[0.05]"><Mail size={14} />Email</a><a href={`tel:${selectedLead.phone_number}`} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 py-2.5 text-xs text-white/75 hover:bg-white/[0.05]"><Phone size={14} />Call</a><a href={`https://wa.me/${phoneDigits}`} target="_blank" rel="noreferrer" className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-emerald-300/15 bg-emerald-400/[0.05] py-2.5 text-xs text-emerald-100 hover:bg-emerald-400/10"><MessageCircle size={14} />WhatsApp<ArrowUpRight size={12} /></a></div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-4 border-b border-white/[0.07] p-5 text-xs">
                <div className="flex items-start gap-2.5"><Building2 size={14} className="mt-0.5 shrink-0 text-white/35" /><span><span className="block text-white/35">Business</span><span className="mt-1 block text-white/80">{selectedLead.business_type}</span></span></div>
                <div className="flex items-start gap-2.5"><MapPin size={14} className="mt-0.5 shrink-0 text-white/35" /><span><span className="block text-white/35">Address</span><span className="mt-1 block text-white/80">{selectedLead.address}</span></span></div>
                <div className="flex items-start gap-2.5"><Activity size={14} className="mt-0.5 shrink-0 text-white/35" /><span><span className="block text-white/35">Lead source</span><span className="mt-1 block text-white/80">{selectedLead.source}</span></span></div>
                <div className="flex items-start gap-2.5"><Clock3 size={14} className="mt-0.5 shrink-0 text-white/35" /><span><span className="block text-white/35">Language</span><span className="mt-1 block text-white/80">{selectedLead.locale === "ar" ? "Arabic" : "English"}</span></span></div>
              </div>
              <div className="grid gap-4 border-b border-white/[0.07] p-5 sm:grid-cols-2">
                <Field label="Pipeline stage"><select value={selectedLead.status} disabled={busy} onChange={(event) => void updateLead({ status: event.target.value as DemoRequestStatus })} className={inputClass}>{statuses.map((status) => <option key={status} value={status}>{statusLabels[status]}</option>)}</select></Field>
                <Field label="Priority"><select value={selectedLead.priority} disabled={busy} onChange={(event) => void updateLead({ priority: event.target.value as DemoRequestPriority })} className={inputClass}>{priorities.map((priority) => <option key={priority} value={priority}>{priorityLabels[priority]}</option>)}</select></Field>
                <Field label="Next follow-up"><span className="relative"><CalendarClock size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/35" /><input type="datetime-local" value={localDateInput(selectedLead.follow_up_at)} disabled={busy} onChange={(event) => void updateLead({ follow_up_at: event.target.value ? new Date(event.target.value).toISOString() : null })} className={`${inputClass} pl-9`} /></span></Field>
                <div className="flex items-end text-[11px] text-white/35">{selectedLead.follow_up_at ? `Scheduled ${new Date(selectedLead.follow_up_at).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}` : "No follow-up scheduled"}</div>
              </div>
              {selectedLead.message && <div className="border-b border-white/[0.07] p-5"><p className="text-xs font-medium text-white/40">Original message</p><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-white/75">{selectedLead.message}</p></div>}
              <div className="p-5">
                <div className="flex items-center justify-between"><h4 className="flex items-center gap-2 text-sm font-semibold"><Activity size={15} className="text-amber-200" />Activity</h4><span className="text-[10px] text-white/35">Latest 100 events</span></div>
                <form onSubmit={addNote} className="mt-4"><textarea rows={2} maxLength={2000} value={newNote} onChange={(event) => setNewNote(event.target.value)} placeholder="Add a note to this lead…" className={`${inputClass} resize-y`} /><button disabled={busy || !newNote.trim()} className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-white/[0.08] px-3 py-2 text-xs font-medium text-white/80 hover:bg-white/[0.12] disabled:opacity-35"><Plus size={13} />Add note</button></form>
                <div className="mt-5 space-y-4">
                  {activities.length === 0 ? <p className="py-3 text-xs text-white/35">No activity recorded for this lead yet.</p> : activities.map((activity) => <article key={activity.id} className="relative border-l border-white/10 pl-4"><span className="absolute -left-[4px] top-1.5 h-1.5 w-1.5 rounded-full bg-amber-200" /><p className="text-xs leading-5 text-white/75">{activity.details}</p><p className="mt-1 text-[10px] text-white/35">{activity.actor} · {new Date(activity.created_at).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}</p></article>)}
                </div>
                {selectedLead.admin_notes && <details className="mt-4 rounded-xl border border-white/[0.07] p-3"><summary className="cursor-pointer text-xs text-white/45">Previous CRM notes</summary><p className="mt-2 whitespace-pre-wrap text-xs leading-5 text-white/65">{selectedLead.admin_notes}</p></details>}
                {notice && <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-emerald-200"><Check size={13} />{notice}</p>}
              </div>
            </>}
          </aside>
        </section>
        <footer className="mt-5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-white/30"><span>VBN+ Sales CRM · Private workspace</span><span>Showing {leads.length} of {total} matching leads</span></footer>
      </div>

      {showCreate && <div className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-black/75 px-4 py-8 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowCreate(false); }}>
        <section role="dialog" aria-modal="true" aria-labelledby="new-lead-title" className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#17171c] p-5 shadow-2xl sm:p-7">
          <header className="flex items-start justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">New record</p><h2 id="new-lead-title" className="mt-2 text-2xl font-semibold">Add a lead</h2><p className="mt-1 text-sm text-white/40">Create a prospect record and start tracking next steps.</p></div><button onClick={() => setShowCreate(false)} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-xl text-white/45 hover:bg-white/[0.06]"><X size={17} /></button></header>
          <form onSubmit={createLead} className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="First name"><input name="first_name" required maxLength={80} className={inputClass} /></Field><Field label="Last name"><input name="last_name" required maxLength={80} className={inputClass} /></Field>
            <Field label="Email"><input name="email" type="email" required maxLength={254} className={inputClass} /></Field><Field label="Phone"><input name="phone_number" type="tel" required minLength={7} maxLength={40} className={inputClass} /></Field>
            <Field label="Business type"><input name="business_type" required minLength={2} maxLength={160} className={inputClass} placeholder="e.g. Retail, hospitality" /></Field><Field label="Lead source"><select name="source" className={inputClass}><option>Manual entry</option><option>Referral</option><option>WhatsApp</option><option>Social media</option><option>Event</option><option>Website</option><option>Other</option></select></Field>
            <Field label="Selected package"><select name="package_type" className={inputClass}><option value="silver">Silver</option><option value="bronze">Bronze</option><option value="gold">Gold</option><option value="consultation">Free consultation</option></select></Field><Field label="Business address"><input name="address" required minLength={3} maxLength={300} className={inputClass} /></Field>
            <div className="sm:col-span-2"><Field label="Notes"><textarea name="message" maxLength={1500} rows={3} className={`${inputClass} resize-y`} placeholder="Context, needs, or initial conversation…" /></Field></div>
            {error && <p role="alert" className="sm:col-span-2 text-sm text-rose-200">{error}</p>}
            <div className="flex justify-end gap-2 border-t border-white/[0.07] pt-4 sm:col-span-2"><button type="button" onClick={() => setShowCreate(false)} className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-white/65 hover:bg-white/[0.05]">Cancel</button><button disabled={savingNew} className="inline-flex items-center gap-2 rounded-xl bg-amber-300 px-4 py-2.5 text-sm font-semibold text-[#17130a] disabled:opacity-50">{savingNew ? "Creating…" : <><Plus size={15} />Create lead</>}</button></div>
          </form>
        </section>
      </div>}

      {showEditLead && selectedLead && <div className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-black/75 px-4 py-8 backdrop-blur-sm" onMouseDown={(event) => { if (event.target === event.currentTarget) setShowEditLead(false); }}>
        <section role="dialog" aria-modal="true" aria-labelledby="edit-lead-title" className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#17171c] p-5 shadow-2xl sm:p-7">
          <header className="flex items-start justify-between"><div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">Lead record</p><h2 id="edit-lead-title" className="mt-2 text-2xl font-semibold">Edit details</h2><p className="mt-1 text-sm text-white/40">Keep this contact and opportunity information up to date.</p></div><button type="button" onClick={() => setShowEditLead(false)} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-xl text-white/45 hover:bg-white/[0.06]"><X size={17} /></button></header>
          <form onSubmit={saveEditedLead} className="mt-6 grid gap-4 sm:grid-cols-2">
            <Field label="First name"><input name="first_name" defaultValue={selectedLead.first_name} required maxLength={80} className={inputClass} /></Field><Field label="Last name"><input name="last_name" defaultValue={selectedLead.last_name} required maxLength={80} className={inputClass} /></Field>
            <Field label="Email"><input name="email" type="email" defaultValue={selectedLead.email} required maxLength={254} className={inputClass} /></Field><Field label="Phone"><input name="phone_number" type="tel" defaultValue={selectedLead.phone_number} required minLength={7} maxLength={40} className={inputClass} /></Field>
            <Field label="Business type"><input name="business_type" defaultValue={selectedLead.business_type} required minLength={2} maxLength={160} className={inputClass} /></Field><Field label="Lead source"><input name="source" defaultValue={selectedLead.source} required maxLength={80} className={inputClass} /></Field>
            <Field label="Selected package"><select name="package_type" defaultValue={selectedLead.package_type} className={inputClass}><option value="silver">Silver</option><option value="bronze">Bronze</option><option value="gold">Gold</option><option value="consultation">Free consultation</option></select></Field><Field label="Business address"><input name="address" defaultValue={selectedLead.address} required minLength={3} maxLength={300} className={inputClass} /></Field>
            <div className="sm:col-span-2"><Field label="Message"><textarea name="message" defaultValue={selectedLead.message} maxLength={1500} rows={3} className={`${inputClass} resize-y`} /></Field></div>
            <div className="flex justify-end gap-2 border-t border-white/[0.07] pt-4 sm:col-span-2"><button type="button" onClick={() => setShowEditLead(false)} className="rounded-xl border border-white/10 px-4 py-2.5 text-sm text-white/65 hover:bg-white/[0.05]">Cancel</button><button disabled={busy} className="inline-flex items-center gap-2 rounded-xl bg-amber-300 px-4 py-2.5 text-sm font-semibold text-[#17130a] disabled:opacity-50">{busy ? "Saving…" : <><Check size={15} />Save changes</>}</button></div>
          </form>
        </section>
      </div>}
    </main>
  );
}
