import React, { useEffect, useMemo, useState } from 'react';

// Minimal, dependency-free UI replacing shadcn/lucide/framer-motion
function Section({ title, children }) {
  return (
    <section style={{ border: '1px solid #333', borderRadius: 12, padding: 16, background: '#0f172a' }}>
      <h3 style={{ margin: 0, marginBottom: 8, color: '#9ca3af', fontSize: 14 }}>{title}</h3>
      {children}
    </section>
  );
}

function KVP({ label, value }) {
  if (!value) return null;
  return (
    <div style={{ display: 'flex', gap: 8, padding: '6px 0', borderBottom: '1px dashed #243242' }}>
      <div style={{ width: 140, color: '#9ca3af' }}>{label}</div>
      <div style={{ color: '#e5e7eb' }}>{value}</div>
    </div>
  );
}

// Build UI sections from either a GSM-like nested spec or a flat object spec
function shapeSections(spec) {
  if (!spec) return { display: [], hardware: [], software: [], security: [], camera: [], battery: [], conn: [], updates: [] };

  // Path A: object fields (Wikipedia/parsed infobox)
  if (!spec.specifications) {
    const display = [
      { label: 'Type', value: spec.displayType },
      { label: 'Size', value: spec.displaySize },
      { label: 'Resolution', value: spec.displayResolution },
      { label: 'Refresh Rate', value: spec.refreshRate },
      { label: 'Protection', value: spec.displayProtection },
    ];
    const hardware = [
      { label: 'OS', value: spec.os },
      { label: 'Chipset', value: spec.chipset },
      { label: 'CPU', value: spec.cpu },
      { label: 'GPU', value: spec.gpu },
      { label: 'RAM', value: spec.ram },
      { label: 'Storage', value: spec.storage },
      { label: 'Card Slot', value: spec.cardSlot },
    ];
    const software = [
      { label: 'OS Version at Launch', value: spec.os },
      { label: 'UI', value: spec.ui },
    ];
    const security = [
      { label: 'Biometrics', value: spec.biometrics },
      { label: 'IP Rating', value: spec.ipRating },
    ];
    const camera = [
      { label: 'Main Camera', value: spec.mainCamera },
      { label: 'Main Video', value: spec.mainVideo },
      { label: 'Selfie Camera', value: spec.selfieCamera },
      { label: 'Selfie Video', value: spec.selfieVideo },
    ];
    const battery = [
      { label: 'Capacity', value: spec.batteryCapacity },
      { label: 'Charging', value: spec.charging },
    ];
    const conn = [
      { label: 'WLAN', value: spec.wlan },
      { label: 'Bluetooth', value: spec.bluetooth },
      { label: 'Positioning', value: spec.positioning },
      { label: 'NFC', value: spec.nfc },
      { label: 'USB', value: spec.usb },
    ];
    const updates = [
      { label: 'OS Updates', value: spec.osUpdates },
    ];
    return { display, hardware, software, security, camera, battery, conn, updates };
  }

  // Path B: nested GSM-like spec (backward-compatible)
  const flat = {};
  try {
    (spec.specifications || []).forEach((group) => {
      (group.specs || []).forEach((item) => {
        const k = `${group.title}::${item.key || item.k || ''}`;
        flat[k] = (item.val || item.value || []).join(', ');
      });
    });
  } catch {}
  const g = (prefix) => (key, alt) => flat[`${prefix}::${key}`] || flat[`${prefix}::${alt || ''}`] || undefined;
  const display = [
    { label: 'Type', value: g('Display')('Type') },
    { label: 'Size', value: g('Display')('Size') },
    { label: 'Resolution', value: g('Display')('Resolution') },
    { label: 'Refresh Rate', value: g('Display')('Refresh rate', 'Refresh Rate') },
    { label: 'Protection', value: g('Display')('Protection') },
  ];
  const platform = [
    { label: 'OS', value: g('Platform')('OS') },
    { label: 'Chipset', value: g('Platform')('Chipset') },
    { label: 'CPU', value: g('Platform')('CPU') },
    { label: 'GPU', value: g('Platform')('GPU') },
    { label: 'RAM', value: g('Memory')('Internal', 'RAM') },
    { label: 'Storage', value: g('Memory')('Internal') },
    { label: 'Card Slot', value: g('Memory')('Card slot') },
  ];
  const software = [
    { label: 'OS Version at Launch', value: g('Platform')('OS') },
    { label: 'UI', value: g('Platform')('UI') },
  ];
  const security = [
    { label: 'Biometrics', value: g('Features')('Sensors') },
    { label: 'IP Rating', value: g('Body')('Build')?.match(/IP\d{2}/g)?.join(', ') || g('Body')('SIM')?.match(/IP\d{2}/g)?.join(', ') || undefined },
  ];
  const camera = [
    { label: 'Main Camera', value: g('Main Camera')('Triple') || g('Main Camera')('Dual') || g('Main Camera')('Single') },
    { label: 'Main Video', value: g('Main Camera')('Video') },
    { label: 'Selfie Camera', value: g('Selfie camera')('Single') || g('Selfie camera')('Dual') },
    { label: 'Selfie Video', value: g('Selfie camera')('Video') },
  ];
  const battery = [
    { label: 'Capacity', value: g('Battery')('Type') || g('Battery')('Capacity') },
  ];
  const conn = [
    { label: 'WLAN', value: g('Comms')('WLAN') },
    { label: 'Bluetooth', value: g('Comms')('Bluetooth') },
    { label: 'Positioning', value: g('Comms')('Positioning') },
    { label: 'NFC', value: g('Comms')('NFC') },
    { label: 'USB', value: g('Comms')('USB') },
  ];
  const updates = [
    { label: 'OS Updates', value: g('Misc')('OS updates') || g('Misc')('OS Updates') },
  ];
  return { display, hardware: platform, software, security, camera, battery, conn, updates };
}

// --- Wikipedia integration (real-time, no backend) ---
const WIKI_API = 'https://en.wikipedia.org/w/api.php';

async function wikipediaSearchPhones(q) {
  const params = new URLSearchParams({
    action: 'query',
    list: 'search',
    // bias results toward smartphones by including keyword
    srsearch: `${q} smartphone`,
    srlimit: '10',
    format: 'json',
    origin: '*',
  });
  const r = await fetch(`${WIKI_API}?${params.toString()}`);
  if (!r.ok) throw new Error('wiki search failed');
  const j = await r.json();
  const items = (j?.query?.search || []).map(s => ({
    pageid: s.pageid,
    title: s.title,
    snippet: s.snippet,
  }));
  return items;
}

async function wikipediaFetchHTMLByTitle(title) {
  const params = new URLSearchParams({ action: 'parse', page: title, prop: 'text', format: 'json', formatversion: '2', origin: '*' });
  const r = await fetch(`${WIKI_API}?${params.toString()}`);
  if (!r.ok) throw new Error('wiki parse failed');
  const j = await r.json();
  return j?.parse?.text || '';
}

function textFromNode(node) {
  if (!node) return '';
  const clone = node.cloneNode(true);
  // Remove refs/sup tags
  clone.querySelectorAll('sup, .reference').forEach(n => n.remove());
  return clone.textContent.replace(/\s+/g, ' ').trim();
}

function parseInfobox(html) {
  // Parse the HTML and extract infobox rows
  const doc = new DOMParser().parseFromString(html, 'text/html');
  const box = doc.querySelector('.infobox');
  const spec = {};
  if (!box) return spec;
  const rows = box.querySelectorAll('tr');
  rows.forEach(tr => {
    const th = tr.querySelector('th');
    const td = tr.querySelector('td');
    if (!th || !td) return;
    const key = textFromNode(th).toLowerCase();
    const val = textFromNode(td);
    if (!key || !val) return;
    if (key.includes('operating system')) spec.os = val;
    else if (key.includes('system on') || key.includes('chipset') || key === 'soc') spec.chipset = val;
    else if (key === 'cpu' || key.includes('processor')) spec.cpu = val;
    else if (key === 'gpu') spec.gpu = val;
    else if (key.includes('memory') || key === 'ram') spec.ram = val;
    else if (key.includes('storage')) spec.storage = val;
    else if (key.includes('battery')) spec.batteryCapacity = val;
    else if (key.includes('charging')) spec.charging = val;
    else if (key.includes('display') || key.includes('screen')) spec.displayType = val;
    else if (key.includes('resolution')) spec.displayResolution = val;
    else if (key.includes('refresh')) spec.refreshRate = val;
    else if (key.includes('protection') || key.includes('glass')) spec.displayProtection = val;
    else if (key.includes('rear camera') || key.includes('main camera')) spec.mainCamera = val;
    else if (key.includes('front camera') || key.includes('selfie')) spec.selfieCamera = val;
    else if (key.includes('video')) {
      // Heuristic: if main camera already set, assume this is video capability
      if (!spec.mainVideo) spec.mainVideo = val; else spec.selfieVideo = spec.selfieVideo || val;
    }
    else if (key.includes('wifi') || key.includes('wi‑fi') || key.includes('wi-fi')) spec.wlan = val;
    else if (key.includes('bluetooth')) spec.bluetooth = val;
    else if (key.includes('nfc')) spec.nfc = val;
    else if (key.includes('usb')) spec.usb = val;
    else if (key.includes('positioning') || key.includes('gps')) spec.positioning = val;
    else if (key.includes('ip rating')) spec.ipRating = val;
    else if (key.includes('brand') || key.includes('manufacturer')) spec.brand = val;
    else if (key.includes('dimensions') && !spec.displaySize) {
      // Sometimes size inches is embedded; try to extract 6.x inches
      const m = val.match(/(\d+(?:\.\d+)?)\s*(?:in|inch|inches)/i);
      if (m) spec.displaySize = `${m[1]} inches`;
    }
  });
  return spec;
}

export default function AISmartphoneCompare() {
  const [a, setA] = useState(null);
  const [b, setB] = useState(null);
  const [queryA, setQueryA] = useState('');
  const [queryB, setQueryB] = useState('');
  const [resultsA, setResultsA] = useState([]);
  const [resultsB, setResultsB] = useState([]);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [suggA, setSuggA] = useState([]);
  const [suggB, setSuggB] = useState([]);
  const [typingTimerA, setTypingTimerA] = useState(null);
  const [typingTimerB, setTypingTimerB] = useState(null);

  async function search(which, q) {
    if (!q) return;
    setLoading(true);
    setError('');
    setStatus(`Searching ${which}…`);
    try {
      const items = await wikipediaSearchPhones(q);
      const mapped = items.map(it => ({
        id: it.pageid,
        title: it.title,
        phone_name: it.title,
        brand: undefined,
      })).slice(0, 8);
      which === 'A' ? setResultsA(mapped) : setResultsB(mapped);
      if (mapped.length === 0) setStatus(`No results for "${q}"`);
      else setStatus('');
    } catch (e) {
      console.warn(e);
      setError('Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  // --- AI suggestions (typeahead)
  async function suggest(which, q) {
    if (!q) { which === 'A' ? setSuggA([]) : setSuggB([]); return; }
    try {
      const items = await wikipediaSearchPhones(q);
      const list = items.slice(0, 6).map(x => ({ brand: '', name: x.title }));
      which === 'A' ? setSuggA(list) : setSuggB(list);
    } catch (_) {
      which === 'A' ? setSuggA([]) : setSuggB([]);
    }
  }

  async function pick(which, item) {
    setLoading(true);
    setError('');
    setStatus(`Loading ${which} details…`);
    try {
      const html = await wikipediaFetchHTMLByTitle(item.title || item.phone_name);
      const spec = parseInfobox(html);
      const enriched = {
        ...spec,
        phone_name: item.title || item.phone_name,
        brand: spec.brand || undefined,
      };
      which === 'A' ? setA(enriched) : setB(enriched);
      setStatus('');
    } catch (e) {
      console.warn(e);
      setError('Failed to load phone details. Try another result.');
    } finally {
      setLoading(false);
    }
  }

  const aSections = useMemo(() => shapeSections(a), [a]);
  const bSections = useMemo(() => shapeSections(b), [b]);

  // ---------- Local compare (no AI required)
  function numFrom(text, unitRegex) {
    if (!text) return null;
    const m = String(text).replace(/,/g, '').match(unitRegex);
    return m ? Number(m[1]) : null;
  }

  function deriveMetrics(spec, sections) {
    if (!spec) return null;
    // Accept both array sections and direct spec fields
    const dispMap = sections.display.reduce((acc, x) => ({ ...acc, [x.label]: x.value }), {});
    const hwMap = sections.hardware.reduce((acc, x) => ({ ...acc, [x.label]: x.value }), {});
    const batMap = sections.battery.reduce((acc, x) => ({ ...acc, [x.label]: x.value }), {});

    const sizeIn = numFrom(dispMap.Size || spec.displaySize, /(\d+(?:\.\d+)?)\s*(?:in|inch|inches)/i);
    const hz = numFrom(dispMap['Refresh Rate'] || spec.refreshRate, /(\d{2,3})\s*Hz/i);
    const ram = numFrom(hwMap.RAM || spec.ram, /(\d+(?:\.\d+)?)\s*GB/i);
    const storage = numFrom(hwMap.Storage || spec.storage, /(\d+(?:\.\d+)?)\s*GB/i);
    const mAh = numFrom(batMap.Capacity || spec.batteryCapacity, /(\d{3,5})\s*mAh/i);

    return {
      name: spec.phone_name || spec.brand || 'Device',
      sizeIn,
      hz,
      ram,
      storage,
      mAh,
      chipset: hwMap.Chipset || spec.chipset || '',
      cpu: hwMap.CPU || spec.cpu || '',
      os: hwMap.OS || spec.os || sections.software.find(s=>s.label==='OS Version at Launch')?.value || '',
    };
  }

  const metricsA = useMemo(() => deriveMetrics(a, aSections), [a, aSections]);
  const metricsB = useMemo(() => deriveMetrics(b, bSections), [b, bSections]);

  // Auto-compare when both are selected
  useEffect(() => {
    if (a && b) runCompare();
  }, [a, b]);

  function winner(aVal, bVal) {
    if (aVal == null && bVal == null) return 'tie';
    if (aVal == null) return 'B';
    if (bVal == null) return 'A';
    if (aVal === bVal) return 'tie';
    return aVal > bVal ? 'A' : 'B';
  }

  const compareRows = useMemo(() => {
    if (!metricsA || !metricsB) return [];
    return [
      { label: 'Display size (in)', a: metricsA.sizeIn, b: metricsB.sizeIn, win: winner(metricsA.sizeIn, metricsB.sizeIn) },
      { label: 'Refresh rate (Hz)', a: metricsA.hz, b: metricsB.hz, win: winner(metricsA.hz, metricsB.hz) },
      { label: 'RAM (GB)', a: metricsA.ram, b: metricsB.ram, win: winner(metricsA.ram, metricsB.ram) },
      { label: 'Storage (GB)', a: metricsA.storage, b: metricsB.storage, win: winner(metricsA.storage, metricsB.storage) },
      { label: 'Battery (mAh)', a: metricsA.mAh, b: metricsB.mAh, win: winner(metricsA.mAh, metricsB.mAh) },
    ];
  }, [metricsA, metricsB]);

  function runCompare() {
    if (!metricsA || !metricsB) return;
    // Build a small human summary without external AI
    const winsA = compareRows.filter(r => r.win === 'A').map(r => r.label);
    const winsB = compareRows.filter(r => r.win === 'B').map(r => r.label);
    const ties = compareRows.filter(r => r.win === 'tie').map(r => r.label);

    const verdictParts = [];
    if (winsA.length && winsB.length) {
      verdictParts.push(`${metricsA.name} leads in ${winsA.join(', ')}; ${metricsB.name} leads in ${winsB.join(', ')}.`);
    } else if (winsA.length) {
      verdictParts.push(`${metricsA.name} leads in ${winsA.join(', ')}.`);
    } else if (winsB.length) {
      verdictParts.push(`${metricsB.name} leads in ${winsB.join(', ')}.`);
    }
    if (ties.length) verdictParts.push(`Ties: ${ties.join(', ')}.`);

    setSummary({
      verdict: verdictParts.join(' '),
      winsA,
      winsB,
      ties,
    });
  }

  async function runAISummary() {
    if (!metricsA || !metricsB) return;
    const prompt = `You are a neutral smartphone reviewer. Compare two phones and return a crisp paragraph and 3 bullets of strengths for each.\nA: ${metricsA.name}. Specs: size ${metricsA.sizeIn} in, ${metricsA.hz} Hz, RAM ${metricsA.ram} GB, storage ${metricsA.storage} GB, battery ${metricsA.mAh} mAh, chipset ${metricsA.chipset}.\nB: ${metricsB.name}. Specs: size ${metricsB.sizeIn} in, ${metricsB.hz} Hz, RAM ${metricsB.ram} GB, storage ${metricsB.storage} GB, battery ${metricsB.mAh} mAh, chipset ${metricsB.chipset}.`;
    setLoading(true);
    try {
      const provider = 'openrouter';
  const resp = await fetch(`/api/ai/summary?provider=${encodeURIComponent(provider)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await resp.json();
      // Hugging Face returns array with generated_text; OpenRouter returns { choices: [ { message: { content } } ] }
      let text = '';
      if (Array.isArray(data)) text = data[0]?.generated_text || '';
      else if (data?.choices?.[0]?.message?.content) text = data.choices[0].message.content;
      else if (data.generated_text) text = data.generated_text;
      else text = JSON.stringify(data);
      setSummary({ verdict: String(text).slice(0, 1000), winsA: [], winsB: [], ties: [] });
    } catch (e) {
      setSummary({ verdict: 'AI request failed. Check token/network and try again.', winsA: [], winsB: [], ties: [] });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg,#0b1222,#0f172a)', color: '#e5e7eb', padding: 16 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gap: 16 }}>
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 22 }}>AI Smartphone Compare</h1>
            <p style={{ margin: 0, color: '#9ca3af', fontSize: 13 }}>Pick two phones to compare specs</p>
          </div>
          <div style={{ minHeight: 20 }}>
            {loading && <span style={{ color: '#60a5fa' }}>Loading…</span>}
            {!loading && status && <span style={{ color: '#9ca3af' }}>{status}</span>}
          </div>
        </header>

        {/* Controls / actions */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', justifyContent: 'flex-end' }}>
          {/* AI provider removed for now since we use local summary */}
          <button onClick={runCompare} disabled={!a || !b} style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid #334155', background: !a||!b ? '#111827' : '#22c55e', color: '#0b1222', fontWeight: 700, cursor: !a||!b ? 'not-allowed' : 'pointer' }}>Compare</button>
          <button onClick={runAISummary} disabled={!a || !b} title={'Use OpenRouter or Hugging Face via the proxy'} style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid #334155', background: '#3b82f6', color: 'white', fontWeight: 700, opacity: !a||!b ? .5 : 1 }}>AI Summary</button>
          <button onClick={()=>{setA(null);setB(null);setResultsA([]);setResultsB([]);setQueryA('');setQueryB('');setSummary(null);}} style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid #334155', background: 'transparent', color: '#e5e7eb' }}>Reset</button>
        </div>

        {error && (
          <div style={{ color: '#f87171' }}>{error}</div>
        )}

        {/* Main two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {/* Left phone */}
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <input value={queryA} onChange={(e)=>{
                const v = e.target.value; setQueryA(v);
                if (typingTimerA) clearTimeout(typingTimerA);
                const t = setTimeout(()=>suggest('A', v), 250);
                setTypingTimerA(t);
              }} placeholder="Search phone A" style={{ flex: 1, padding: 10, borderRadius: 10, border: '1px solid #334155', background: '#0f172a', color: '#e5e7eb' }} />
              <button onClick={()=>search('A', queryA)} style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid #334155', background: '#1f2937', color: '#e5e7eb' }}>Search</button>
            </div>
            {suggA.length>0 && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {suggA.map((s, idx)=> (
                  <button key={idx} onClick={()=>{ setQueryA(`${s.brand} ${s.name}`); search('A', `${s.brand} ${s.name}`); setSuggA([]); }} style={{ border: '1px solid #334155', borderRadius: 999, padding: '6px 10px', background: '#0f172a', color: '#e5e7eb', cursor: 'pointer', fontSize: 12 }}>
                    {s.brand} {s.name}
                  </button>
                ))}
              </div>
            )}
            {resultsA.length>0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px,1fr))', gap: 8 }}>
                {resultsA.map((it)=> (
                  <button key={it.id || it.title} onClick={()=>pick('A', it)} style={{ textAlign: 'left', border: '1px solid #334155', borderRadius: 12, padding: 10, background: '#0f172a', color: '#e5e7eb', cursor: 'pointer' }}>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{it.phone_name || it.title}</div>
                    {it.brand && (<div style={{ color: '#9ca3af', fontSize: 12 }}>{it.brand}</div>)}
                  </button>
                ))}
              </div>
            )}
            {resultsA.length===0 && status && (
              <div style={{ color: '#9ca3af', fontSize: 12 }}>{status}</div>
            )}

            {a && (
              <Section title={`A • ${a.phone_name || a.brand || 'Selected'}`}>
                <div style={{ display: 'grid', gap: 12 }}>
                  <Section title="Display">
                    {aSections.display.map((x)=> <KVP key={x.label} label={x.label} value={x.value} />)}
                  </Section>
                  <Section title="Hardware">
                    {aSections.hardware.map((x)=> <KVP key={x.label} label={x.label} value={x.value} />)}
                  </Section>
                  <Section title="Software">
                    {aSections.software.map((x)=> <KVP key={x.label} label={x.label} value={x.value} />)}
                  </Section>
                  <Section title="Security">
                    {aSections.security.map((x)=> <KVP key={x.label} label={x.label} value={x.value} />)}
                  </Section>
                  <Section title="Camera">
                    {aSections.camera.map((x)=> <KVP key={x.label} label={x.label} value={x.value} />)}
                  </Section>
                  <Section title="Battery">
                    {aSections.battery.map((x)=> <KVP key={x.label} label={x.label} value={x.value} />)}
                  </Section>
                  <Section title="Connectivity">
                    {aSections.conn.map((x)=> <KVP key={x.label} label={x.label} value={x.value} />)}
                  </Section>
                  <Section title="Updates">
                    {aSections.updates.map((x)=> <KVP key={x.label} label={x.label} value={x.value} />)}
                  </Section>
                </div>
              </Section>
            )}
          </div>

          {/* Right phone */}
          <div style={{ display: 'grid', gap: 12 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <input value={queryB} onChange={(e)=>{
                const v = e.target.value; setQueryB(v);
                if (typingTimerB) clearTimeout(typingTimerB);
                const t = setTimeout(()=>suggest('B', v), 250);
                setTypingTimerB(t);
              }} placeholder="Search phone B" style={{ flex: 1, padding: 10, borderRadius: 10, border: '1px solid #334155', background: '#0f172a', color: '#e5e7eb' }} />
              <button onClick={()=>search('B', queryB)} style={{ padding: '10px 12px', borderRadius: 10, border: '1px solid #334155', background: '#1f2937', color: '#e5e7eb' }}>Search</button>
            </div>
            {suggB.length>0 && (
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {suggB.map((s, idx)=> (
                  <button key={idx} onClick={()=>{ setQueryB(`${s.brand} ${s.name}`); search('B', `${s.brand} ${s.name}`); setSuggB([]); }} style={{ border: '1px solid #334155', borderRadius: 999, padding: '6px 10px', background: '#0f172a', color: '#e5e7eb', cursor: 'pointer', fontSize: 12 }}>
                    {s.brand} {s.name}
                  </button>
                ))}
              </div>
            )}
            {resultsB.length>0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px,1fr))', gap: 8 }}>
                {resultsB.map((it)=> (
                  <button key={it.id || it.title} onClick={()=>pick('B', it)} style={{ textAlign: 'left', border: '1px solid #334155', borderRadius: 12, padding: 10, background: '#0f172a', color: '#e5e7eb', cursor: 'pointer' }}>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{it.phone_name || it.title}</div>
                    {it.brand && (<div style={{ color: '#9ca3af', fontSize: 12 }}>{it.brand}</div>)}
                  </button>
                ))}
              </div>
            )}
            {resultsB.length===0 && status && (
              <div style={{ color: '#9ca3af', fontSize: 12 }}>{status}</div>
            )}

            {b && (
              <Section title={`B • ${b.phone_name || b.brand || 'Selected'}`}>
                <div style={{ display: 'grid', gap: 12 }}>
                  <Section title="Display">
                    {bSections.display.map((x)=> <KVP key={x.label} label={x.label} value={x.value} />)}
                  </Section>
                  <Section title="Hardware">
                    {bSections.hardware.map((x)=> <KVP key={x.label} label={x.label} value={x.value} />)}
                  </Section>
                  <Section title="Software">
                    {bSections.software.map((x)=> <KVP key={x.label} label={x.label} value={x.value} />)}
                  </Section>
                  <Section title="Security">
                    {bSections.security.map((x)=> <KVP key={x.label} label={x.label} value={x.value} />)}
                  </Section>
                  <Section title="Camera">
                    {bSections.camera.map((x)=> <KVP key={x.label} label={x.label} value={x.value} />)}
                  </Section>
                  <Section title="Battery">
                    {bSections.battery.map((x)=> <KVP key={x.label} label={x.label} value={x.value} />)}
                  </Section>
                  <Section title="Connectivity">
                    {bSections.conn.map((x)=> <KVP key={x.label} label={x.label} value={x.value} />)}
                  </Section>
                  <Section title="Updates">
                    {bSections.updates.map((x)=> <KVP key={x.label} label={x.label} value={x.value} />)}
                  </Section>
                </div>
              </Section>
            )}
          </div>
        </div>

        {/* Comparison output */}
        {(a && b) && (
          <Section title="Comparison">
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: 8, color: '#9ca3af' }}>Metric</th>
                    <th style={{ textAlign: 'left', padding: 8, color: '#9ca3af' }}>{metricsA?.name || 'A'}</th>
                    <th style={{ textAlign: 'left', padding: 8, color: '#9ca3af' }}>{metricsB?.name || 'B'}</th>
                    <th style={{ textAlign: 'left', padding: 8, color: '#9ca3af' }}>Winner</th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((r) => (
                    <tr key={r.label}>
                      <td style={{ padding: 8, borderBottom: '1px solid #243242' }}>{r.label}</td>
                      <td style={{ padding: 8, borderBottom: '1px solid #243242' }}>{r.a ?? '-'}</td>
                      <td style={{ padding: 8, borderBottom: '1px solid #243242' }}>{r.b ?? '-'}</td>
                      <td style={{ padding: 8, borderBottom: '1px solid #243242' }}>{r.win === 'tie' ? 'Tie' : r.win}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {summary && (
              <div style={{ marginTop: 12, padding: 12, border: '1px solid #243242', borderRadius: 10, background: '#0f172a' }}>
                <div style={{ fontWeight: 700, marginBottom: 6 }}>Summary</div>
                <div style={{ color: '#e5e7eb', whiteSpace: 'pre-wrap' }}>{summary.verdict}</div>
              </div>
            )}
          </Section>
        )}
      </div>
    </div>
  );
}
