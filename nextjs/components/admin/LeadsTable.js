'use client';
import { useMemo, useState } from 'react';

const DETAILS = [
  ['phone', 'Phone'],
  ['venueDate', 'Venue & date'],
  ['guestCount', 'Guests'],
  ['budget', 'Budget'],
  ['packages', 'Interested in'],
  ['referral', 'Heard about us'],
];

const CSV_COLUMNS = [
  ['createdAt', 'Received'],
  ['names', 'Names'],
  ['email', 'Email'],
  ...DETAILS,
  ['vision', 'Vision'],
  ['contacted', 'Contacted'],
];

const FILTERS = [
  ['new', 'New'],
  ['contacted', 'Contacted'],
  ['all', 'All'],
];

function formatDate(iso) {
  return new Date(iso).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function downloadCsv(leads) {
  const cell = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const rows = [
    CSV_COLUMNS.map(([, label]) => cell(label)).join(','),
    ...leads.map((lead) => CSV_COLUMNS.map(([key]) => cell(key === 'contacted' ? (lead.contacted ? 'Yes' : 'No') : lead[key])).join(',')),
  ];
  const url = URL.createObjectURL(new Blob([rows.join('\n')], { type: 'text/csv' }));
  const a = Object.assign(document.createElement('a'), { href: url, download: `awe-inquiries-${new Date().toISOString().slice(0, 10)}.csv` });
  a.click();
  URL.revokeObjectURL(url);
}

const SMALL_BTN =
  'cursor-pointer border border-[#e0d6ca] bg-white px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-[#443221] transition-colors hover:border-[#443221] disabled:cursor-default disabled:opacity-50';

export default function LeadsTable({ initialLeads }) {
  const [leads, setLeads] = useState(initialLeads);
  const [filter, setFilter] = useState('new');
  const [query, setQuery] = useState('');
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState('');

  const counts = useMemo(
    () => ({ new: leads.filter((l) => !l.contacted).length, contacted: leads.filter((l) => l.contacted).length, all: leads.length }),
    [leads]
  );

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((lead) => {
      if (filter === 'new' && lead.contacted) return false;
      if (filter === 'contacted' && !lead.contacted) return false;
      if (!q) return true;
      return [lead.names, lead.email, lead.phone, lead.venueDate, lead.vision].some((v) => (v || '').toLowerCase().includes(q));
    });
  }, [leads, filter, query]);

  async function call(method, body) {
    const res = await fetch('/api/admin/leads', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    if (res.status === 401) {
      window.location.reload();
      return false;
    }
    if (!res.ok || !data.ok) throw new Error(data.error || 'Something went wrong.');
    return true;
  }

  async function toggleContacted(lead) {
    setBusyId(lead.id);
    setError('');
    try {
      if (await call('PATCH', { id: lead.id, contacted: !lead.contacted })) {
        setLeads((prev) => prev.map((l) => (l.id === lead.id ? { ...l, contacted: !l.contacted } : l)));
      }
    } catch (err) {
      setError(err.message);
    }
    setBusyId(null);
  }

  async function remove(lead) {
    if (!window.confirm(`Delete the inquiry from ${lead.names}? This can’t be undone.`)) return;
    setBusyId(lead.id);
    setError('');
    try {
      if (await call('DELETE', { id: lead.id })) {
        setLeads((prev) => prev.filter((l) => l.id !== lead.id));
      }
    } catch (err) {
      setError(err.message);
    }
    setBusyId(null);
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="flex border border-[#e0d6ca]" role="tablist" aria-label="Filter inquiries">
          {FILTERS.map(([key, label]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={filter === key}
              onClick={() => setFilter(key)}
              className={`cursor-pointer px-4 py-2 text-[11px] uppercase tracking-[0.16em] transition-colors ${filter === key ? 'bg-[#443221] text-white' : 'bg-white text-[#443221] hover:bg-[#f6f1ea]'}`}
            >
              {label} ({counts[key]})
            </button>
          ))}
        </div>
        <input
          type="search"
          placeholder="Search names, email, venue…"
          aria-label="Search inquiries"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full min-w-0 border border-[#e0d6ca] bg-white px-4 py-2 text-[14px] font-light text-[#443221] outline-none focus:border-[#443221] sm:w-auto sm:max-w-[320px] sm:flex-1"
        />
        <div className="ml-auto flex gap-2">
          <button type="button" onClick={() => downloadCsv(shown)} disabled={!shown.length} className={SMALL_BTN}>
            Download CSV
          </button>
        </div>
      </div>

      {error ? <p role="alert" className="m-0 mb-4 text-[14px] text-[#c0392b]">{error}</p> : null}

      {shown.length === 0 ? (
        <p className="border border-dashed border-[#e0d6ca] px-6 py-12 text-center text-[15px] font-light text-[#80695a]">
          {leads.length === 0 ? 'No inquiries yet. New ones from the contact form will appear here.' : 'Nothing matches.'}
        </p>
      ) : (
        <ul className="m-0 grid list-none gap-4 p-0">
          {shown.map((lead) => (
            <li key={lead.id} className={`border bg-white p-5 md:p-6 ${lead.contacted ? 'border-[#ece5dc] opacity-75' : 'border-[#e0d6ca]'}`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-display text-[22px] leading-tight text-[#443221]">{lead.names}</div>
                  <a href={`mailto:${lead.email}`} className="break-all text-[14px] text-[#80695a] underline-offset-2 hover:underline">
                    {lead.email}
                  </a>
                </div>
                <div className="text-right text-[12px] uppercase tracking-[0.14em] text-[#b3a597]">
                  {formatDate(lead.createdAt)}
                  {lead.contacted ? <div className="mt-1 text-[#6f8f6a]">Contacted</div> : <div className="mt-1 text-[#c08a4a]">New</div>}
                </div>
              </div>

              <dl className="m-0 mt-4 grid gap-x-6 gap-y-2 text-[14px] sm:grid-cols-2 lg:grid-cols-3">
                {DETAILS.map(([key, label]) =>
                  lead[key] ? (
                    <div key={key} className="min-w-0">
                      <dt className="text-[10.5px] uppercase tracking-[0.18em] text-[#b3a597]">{label}</dt>
                      <dd className="m-0 break-words font-light text-[#4a3a2c]">{lead[key]}</dd>
                    </div>
                  ) : null
                )}
              </dl>

              {lead.vision ? (
                <p className="m-0 mt-4 whitespace-pre-line border-l-2 border-[#e0d6ca] pl-4 text-[14.5px] font-light leading-[1.75] text-[#4a3a2c]">
                  {lead.vision}
                </p>
              ) : null}

              <div className="mt-5 flex flex-wrap gap-2">
                <a
                  href={`mailto:${lead.email}?subject=${encodeURIComponent('Your wedding inquiry with AWE')}`}
                  className={`${SMALL_BTN} no-underline`}
                >
                  Reply
                </a>
                <button type="button" onClick={() => toggleContacted(lead)} disabled={busyId === lead.id} className={SMALL_BTN}>
                  {lead.contacted ? 'Mark as new' : 'Mark contacted'}
                </button>
                <button type="button" onClick={() => remove(lead)} disabled={busyId === lead.id} className={`${SMALL_BTN} text-[#a04535]`}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
