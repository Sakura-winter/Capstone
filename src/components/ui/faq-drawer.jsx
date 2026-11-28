"use client";

import React, { useEffect, useRef } from "react";

/** Dark when a .dark / [data-theme=dark] ancestor says so, light when .light says so, else the system's setting. */
const isDark = (host, mq) => {
  if (host.closest(".dark, [data-theme='dark']")) return true;
  if (host.closest(".light, [data-theme='light']")) return false;
  return !!mq?.matches;
};

/** The questions, tailored for Hiredge - The Intelligent Career & Bias-Free Hiring Hub. */
const CARDS = Object.freeze([
  Object.freeze({
    id: 'bias', tab: 'Fairness',
    q: 'How does Hiredge eradicate algorithmic hiring bias?',
    a: 'Hiredge continuously audits matching signals against the EEOC 4/5ths Disparate Impact Ratio (DIR). PII, gender, ethnicity, and geographic proxies are masked during cognitive evaluation, ensuring candidates are measured purely on demonstrated problem-solving agility and verified portfolio depth.',
  }),
  Object.freeze({
    id: 'candidate-privacy', tab: 'Privacy',
    q: 'Who has access to my candidate profile and test data?',
    a: 'Only verified recruiters from accredited companies with active security clearances can access your portfolio. Your resume contact information remains cryptographically protected until you mutually accept an interview request.',
  }),
  Object.freeze({
    id: 'recruiter-2fa', tab: 'Security',
    q: 'Why does recruiter sign-in require two-factor verification?',
    a: 'Hiredge holds candidate career records to enterprise-grade compliance. Recruiters undergo domain-level cryptographic verification and instant 6-digit OTP confirmation to prevent unauthorized corporate scraping and credential stuffing.',
  }),
  Object.freeze({
    id: 'matching-score', tab: 'Resonance',
    q: 'What is the Resonance Match Index and how is it calculated?',
    a: 'Resonance is not a superficial keyword score. It models real cognitive alignment across technical problem solving, system architecture competencies, and mutual communication values between candidate portfolios and engineering team demands.',
  }),
  Object.freeze({
    id: 'beta', tab: 'Beta Release',
    q: 'What does the Hiredge Î² (Beta) status signify?',
    a: 'Hiredge is currently operating in curated Beta for select enterprise hiring partners and ambitious candidates. All core matching algorithms, DIR fairness engines, and secure portals are live and fully active.',
  }),
  Object.freeze({
    id: 'cost', tab: 'Pricing',
    q: 'Is Hiredge free for individual candidates?',
    a: 'Yes, 100% free forever for candidates. Job seekers never pay for resonance evaluations, skill verification, or connecting with hiring teams. Enterprise partners subscribe to compliant talent pipeline tiers.',
  }),
  Object.freeze({
    id: 'support', tab: 'Support',
    q: 'How can I connect with the Hiredge support team?',
    a: 'Reach our dedicated engineering and empathy desk anytime at hello@hiredge.ai. Verified candidates and enterprise teams receive guaranteed responses within 2 hours.',
  }),
]);

const FINISHES = Object.freeze(['auto', 'aluminium', 'graphite']);
const OPEN_AT = Object.freeze(['none', '1', '2', '3', '4', '5', '6', '7']);

const DEFAULTS = Object.freeze({
  label: 'Hiredge Inquiries',
  title: 'Questions filed where you can find them.',
  lead: 'The questions candidates and recruiters ask before joining Hiredge, filed as a tactile index drawer. Pull a card to inspect it.',
  drawer: 'Hiredge · FAQ 2026',
  count: 7,
  open: '1',
  single: true,
  askNote: 'Have a unique question? Our team responds within the hour.',
  askLabel: 'Ask us',
  askHref: 'mailto:hello@hiredge.ai',
  finish: 'auto',
});

/** Tabs sit at three stations along the top edge, as a filing clerk staggers them. */
const TAB_STATIONS = Object.freeze([0.04, 0.37, 0.7]);
const tabStation = (i) => TAB_STATIONS[i % TAB_STATIONS.length];

/** How far into the drawer a card stands: 0 at the front, 1 at the back. */
const depthOf = (i, n) => (n <= 1 ? 0 : (n - 1 - i) / (n - 1));

/** The index printed on a card: Q.01, Q.02â€¦ */
const cardNumber = (i) => `Q.${String(i + 1).padStart(2, '0')}`;

/** A link the Ask key may carry: a page, a path, mail or a phone - never a script. */
const safeHref = (h, fallback = DEFAULTS.askHref) => {
  const s = String(h ?? '').trim();
  return /^(https?:\/\/|mailto:|tel:|\/|#|\.\/|\.\.\/)/i.test(s) ? s : fallback;
};

function normalise(opts = {}, prev = DEFAULTS) {
  const o = { ...prev, ...opts };
  for (const k of ['label', 'title', 'lead', 'drawer', 'askNote', 'askLabel']) o[k] = String(o[k] ?? '');
  o.askHref = safeHref(o.askHref);
  o.count = Math.min(CARDS.length, Math.max(3, Math.round(Number(o.count)) || DEFAULTS.count));
  o.open = OPEN_AT.includes(String(o.open)) ? String(o.open) : DEFAULTS.open;
  if (o.open !== 'none' && Number(o.open) > o.count) o.open = 'none';
  o.single = o.single !== false && o.single !== 'false';
  if (!FINISHES.includes(o.finish)) o.finish = 'auto';
  return o;
}

function resolveFinish(own, around, prefersDark, tone) {
  if (own === 'aluminium' || own === 'graphite') return own;
  if (around === 'aluminium' || around === 'graphite') return around;
  if (tone === 'light' || tone === 'dark') return tone === 'dark' ? 'graphite' : 'aluminium';
  return prefersDark ? 'graphite' : 'aluminium';
}

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

let seq = 0;

function mount(host, opts = {}) {
  let o = normalise(opts);
  const uid = `fq${(seq += 1)}`;
  const root = document.createElement('section');
  root.className = 'fq';
  root.dataset.block = 'faq-drawer';
  root.setAttribute('aria-labelledby', `${uid}-title`);
  host.append(root);

  const render = () => {
    const n = o.count;
    const cards = CARDS.slice(0, n).map((c, i) => `<details class="fq-card"${o.single ? ` name="${uid}"` : ''}${o.open === String(i + 1) ? ' open' : ''} style="--k: ${i}; --depth: ${depthOf(i, n).toFixed(3)}; --tab-at: ${tabStation(i)}">
      <summary class="fq-edge">
        <span class="fq-tab" aria-hidden="true">${esc(c.tab)}</span>
        <span class="fq-no" aria-hidden="true">${cardNumber(i)}</span>
        <span class="fq-q">${esc(c.q)}</span>
        <span class="fq-mark" aria-hidden="true"></span>
      </summary>
      <div class="fq-face"><p class="fq-a">${esc(c.a)}</p><p class="fq-filed" aria-hidden="true">Filed under ${esc(c.tab)} · ${cardNumber(i)}</p></div>
    </details>`).join('');
    root.innerHTML = `<div class="fq-wrap">
  <header class="fq-head">
    <p class="fq-label"></p>
    <h2 class="fq-title" id="${uid}-title"></h2>
    <p class="fq-lead"></p>
  </header>
  <div class="fq-cabinet">
    <div class="fq-drawer">
      <div class="fq-tray">${cards}</div>
      <div class="fq-front" aria-hidden="true">
        <span class="fq-holder"><span class="fq-holder-card"></span></span>
        <span class="fq-pull"></span>
      </div>
    </div>
    <div class="fq-ask">
      <p class="fq-note"></p>
      <a class="fq-key" href="${esc(o.askHref)}"></a>
    </div>
  </div>
</div>`;
    root.querySelector('.fq-label').textContent = o.label;
    root.querySelector('.fq-title').textContent = o.title;
    root.querySelector('.fq-lead').textContent = o.lead;
    root.querySelector('.fq-holder-card').textContent = o.drawer;
    root.querySelector('.fq-note').textContent = o.askNote;
    root.querySelector('.fq-key').textContent = o.askLabel;
  };

  const dark = typeof matchMedia === 'function' ? matchMedia('(prefers-color-scheme: dark)') : null;
  const applyFinish = () => {
    const f = resolveFinish(o.finish, host.closest('[data-finish]')?.dataset.finish, isDark(host, dark), host.closest('[data-tone="light"], [data-tone="dark"]')?.dataset.tone);
    if (root.dataset.finish !== f) root.dataset.finish = f;
  };
  const finishObs = new MutationObserver(applyFinish);
  finishObs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-finish', 'class', 'data-theme'], subtree: true });
  dark?.addEventListener('change', applyFinish);

  render();
  applyFinish();

  return {
    root,
    open(i) {
      const d = root.querySelectorAll('.fq-card')[i];
      if (d) d.open = true;
    },
    update(next = {}) {
      o = normalise(next, o);
      render();
      applyFinish();
    },
    destroy() {
      finishObs.disconnect();
      dark?.removeEventListener('change', applyFinish);
      root.remove();
    },
  };
}

/** An FAQ as a tactile card-index drawer: each question typed along a card edge on a staggered tab, pull one to read it. */
export function FaqDrawer({ className, style, ...options }) {
  const host = useRef(null);
  const key = JSON.stringify(options);

  useEffect(() => {
    if (!host.current) return;
    const block = mount(host.current, JSON.parse(key));
    return () => block.destroy();
  }, [key]);

  return (
    <>
      <style>{CSS}</style>
      <div ref={host} className={className} style={{ width: "100%", ...style }} />
    </>
  );
}

export default FaqDrawer;

// Fonts embedded as data URIs (SIL OFL 1.1), so the piece needs no files and no network.
const CSS = `

.fq {
  color-scheme: light;
  --tui-desk: #F7F5F0;
  --tui-face: #EAE6DE;
  --tui-face-hi: #F5F2EB;
  --tui-face-lo: #DCD6CA;
  --tui-well: #D8D2C4;
  --tui-skirt: #B8B09F;
  --tui-ink: #1B1A17;
  --tui-ink-2: #615B52;
  --tui-rule: rgb(193 95 60 / 0.16);
  --tui-cap: #C15F3C;
  --tui-cap-hi: #D36C47;
  --tui-cap-skirt: #8C3E20;
  --tui-cap-ink: #FFFFFF;
  --tui-cap-hl: rgb(255 255 255 / 0.25);
  --tui-hl: rgb(255 255 255 / 0.9);
  --tui-sh: 30 25 20;
  --tui-sh-a: 0.18;
  --tui-grain: 0.4;
  --tui-focus: #C15F3C;
  --tui-ease: cubic-bezier(0.2, 0.7, 0.2, 1);
  --tui-well-fill: linear-gradient(to bottom, #cfc9bb, var(--tui-well) 55%);
  --tui-raised:
    inset 0 1px 0 var(--tui-hl),
    0 0 0 1px rgb(var(--tui-sh) / calc(var(--tui-sh-a) * 0.35)),
    0 1px 2px rgb(var(--tui-sh) / calc(var(--tui-sh-a) * 1.2)),
    0 6px 14px -5px rgb(var(--tui-sh) / var(--tui-sh-a));
  --tui-inset:
    inset 0 3px 3px -2px rgb(var(--tui-sh) / calc(var(--tui-sh-a) * 2.6)),
    inset 0 9px 12px -9px rgb(var(--tui-sh) / calc(var(--tui-sh-a) * 1.8)),
    inset 0 0 0 1px rgb(var(--tui-sh) / calc(var(--tui-sh-a) * 0.45)),
    inset 0 -1px 0 color-mix(in oklab, var(--tui-hl) 60%, transparent),
    0 1px 0 var(--tui-hl);
  --tui-pressed:
    inset 0 4px 4px -3px rgb(0 0 0 / 0.4),
    0 -1px 0 rgb(0 0 0 / 0.4),
    0 1px 0 var(--tui-hl);
  --tui-noise: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.5 0 0 0 0 0.5 0 0 0 0 0.5 0 0 0 0.28 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");

  --fq-paper: #FAF8F3;
  --fq-type: #1D1B16;
  --fq-type-2: #736B5E;
  --fq-rule: rgb(193 95 60 / 0.12);
  --fq-rule-2: rgb(193 95 60 / 0.38);
  --fq-fibre: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.55' numOctaves='3' seed='9' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .45 0 0 0 0 .42 0 0 0 0 .35 0 0 0 .1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23p)'/%3E%3C/svg%3E");
  --fq-drop: rgb(40 30 20 / 0.22);
  --fq-sans: 'FQ Instrument Sans', 'Instrument Sans', ui-sans-serif, system-ui, sans-serif;
  --fq-type-face: 'FQ Geist Mono', 'Geist Mono', ui-monospace, monospace;

  position: relative;
  container: fq / inline-size;
  interpolate-size: allow-keywords;
  background: transparent;
  color: var(--tui-ink);
  font: 400 15px/1.55 var(--fq-sans);
  -webkit-font-smoothing: antialiased;
}
.fq[data-finish='graphite'], :is(.dark, [data-theme='dark']) .fq {
  color-scheme: dark;
  --tui-desk: #0F131A;
  --tui-face: #1A202C;
  --tui-face-hi: #283245;
  --tui-face-lo: #131722;
  --tui-well: #10141D;
  --tui-skirt: #090C11;
  --tui-ink: #ECE8E1;
  --tui-ink-2: #A3A199;
  --tui-rule: rgb(193 95 60 / 0.2);
  --tui-cap: #C15F3C;
  --tui-cap-hi: #D36C47;
  --tui-cap-skirt: #8C3E20;
  --tui-cap-ink: #FFFFFF;
  --tui-cap-hl: rgb(255 255 255 / 0.3);
  --tui-hl: rgb(255 255 255 / 0.08);
  --tui-well-fill: linear-gradient(to bottom, #07090D, var(--tui-well) 45%, #151A24);
  --tui-sh: 0 0 0;
  --tui-sh-a: 0.6;
  --tui-grain: 0.25;
  --tui-focus: #F3C3A6;
  --fq-drop: rgb(0 0 0 / 0.65);
}
.fq *, .fq *::before, .fq *::after { box-sizing: border-box; }
.fq-head > *, .fq-card p, .fq-ask p { margin: 0; }

.fq-wrap {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.3fr);
  gap: 40px clamp(32px, 5cqi, 80px);
  align-items: start;
  width: 100%;
  max-width: 1200px;
  margin-inline: auto;
  padding-block: clamp(40px, 6cqi, 90px);
}
.fq-head { position: sticky; top: 80px; padding-top: 10px; }
.fq-head .fq-label {
  margin-bottom: 14px;
  font: 700 11px/1.2 var(--fq-sans);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #C15F3C;
}
.fq-title {
  font: 800 clamp(32px, 4.5cqi, 54px)/1.05 var(--fq-sans);
  letter-spacing: -0.03em;
  text-wrap: balance;
  color: var(--tui-ink);
}
.fq-head .fq-lead { margin-top: 18px; max-width: 38ch; font-size: clamp(15px, 1.2cqi, 17px); color: var(--tui-ink-2); text-wrap: pretty; }

.fq-drawer {
  position: relative;
  isolation: isolate;
  padding: 12px 12px 0;
  border-radius: 20px;
  background: var(--tui-face);
  box-shadow: var(--tui-raised);
  border: 1px solid var(--tui-rule);
}
.fq-drawer::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  border-radius: inherit;
  background: var(--tui-noise), linear-gradient(170deg, rgb(255 255 255 / 0.08), transparent 40%);
  opacity: var(--tui-grain);
  pointer-events: none;
}
.fq-tray {
  display: grid;
  padding: 44px 14px 18px;
  border-radius: 14px 14px 4px 4px;
  background: var(--tui-well-fill) var(--tui-well);
  box-shadow: var(--tui-inset);
}

.fq-card {
  --shade: calc(var(--depth, 0) * 0.09);
  position: relative;
  margin-inline: calc(var(--depth, 0) * 5px);
  border-radius: 6px 6px 2px 2px;
  background:
    linear-gradient(rgb(40 36 26 / var(--shade)), rgb(40 36 26 / var(--shade))),
    var(--fq-fibre),
    var(--fq-paper);
  color: var(--fq-type);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.95),
    inset 0 2px 0 rgb(0 0 0 / 0.04),
    0 -1px 0 rgb(0 0 0 / 0.1),
    0 -7px 10px -5px var(--fq-drop);
  transition: transform 220ms var(--tui-ease), box-shadow 220ms var(--tui-ease);
}
.fq-card:first-child { box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.95), 0 -1px 0 rgb(0 0 0 / 0.08); }
.fq-card:not([open]):hover { transform: translateY(-3px); }
.fq-card[open] {
  z-index: 2;
  margin-top: 10px;
  transform: translateY(-12px);
  box-shadow:
    inset 0 1px 0 rgb(255 255 255 / 0.95),
    0 -5px 9px -5px var(--fq-drop),
    0 24px 34px -16px var(--fq-drop),
    0 2px 4px rgb(0 0 0 / 0.15);
}

.fq-edge {
  display: grid;
  grid-template-columns: 5.2ch minmax(0, 1fr) auto;
  align-items: baseline;
  column-gap: 12px;
  padding: 16px 20px 22px;
  list-style: none;
  cursor: pointer;
  font: 500 15px/22px var(--fq-type-face);
  border-radius: inherit;
  -webkit-tap-highlight-color: transparent;
}
.fq-edge::-webkit-details-marker { display: none; }
.fq-edge::marker { content: ''; }
.fq-edge:focus-visible { outline: 2px solid #C15F3C; outline-offset: -4px; }
.fq-no { font-size: 11.5px; letter-spacing: 0.05em; color: #C15F3C; font-weight: 700; }
.fq-q { text-wrap: pretty; color: var(--fq-type); }
.fq-mark { width: 14px; height: 14px; align-self: center; position: relative; }
.fq-mark::before, .fq-mark::after { content: ''; position: absolute; left: 1px; right: 1px; top: 6px; height: 1.8px; background: #C15F3C; border-radius: 1px; }
.fq-mark::after { transform: rotate(90deg); transition: transform 220ms var(--tui-ease); }
.fq-card[open] .fq-mark::after { transform: rotate(0deg); }

.fq-tab {
  position: absolute;
  bottom: 100%;
  left: calc(var(--tab-at, 0) * 100%);
  height: 20px;
  padding: 3px 12px 0;
  border-radius: 6px 6px 0 0;
  background:
    linear-gradient(rgb(40 36 26 / var(--shade)), rgb(40 36 26 / var(--shade))),
    var(--fq-fibre),
    var(--fq-paper);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.95), 0 -4px 7px -4px var(--fq-drop);
  font: 600 11px/16px var(--fq-type-face);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #C15F3C;
  white-space: nowrap;
  pointer-events: none;
}

.fq-card::details-content {
  block-size: 0;
  overflow: clip;
  transition: block-size 320ms var(--tui-ease), content-visibility 320ms allow-discrete;
}
.fq-card[open]::details-content { block-size: auto; }
.fq-face {
  margin: -8px 20px 0;
  padding: 16px 0 24px calc(5.2ch + 12px);
  border-top: 3px double var(--fq-rule-2);
  font: 400 14px/26px var(--fq-type-face);
  background: repeating-linear-gradient(to bottom, transparent 0 25px, var(--fq-rule) 25px 26px) 0 20px / 100% calc(100% - 42px) no-repeat;
}
.fq-a { max-width: 60ch; color: var(--fq-type); }
.fq-filed { margin-top: 24px; font-size: 11px; letter-spacing: 0.06em; color: var(--fq-type-2); text-align: right; }

.fq-front {
  position: relative;
  display: grid;
  justify-items: center;
  gap: 12px;
  margin: 0 -12px;
  padding: 18px 0 20px;
  border-radius: 0 0 20px 20px;
  background: linear-gradient(to bottom, color-mix(in oklab, var(--tui-face-hi) 70%, var(--tui-face)), var(--tui-face));
  box-shadow: inset 0 1px 0 var(--tui-hl), inset 0 2px 0 rgb(var(--tui-sh) / calc(var(--tui-sh-a) * 0.6)), 0 -1px 0 rgb(var(--tui-sh) / calc(var(--tui-sh-a) * 0.9));
}
.fq-holder {
  display: block;
  padding: 3px;
  border-radius: 4px;
  background: linear-gradient(var(--tui-face-lo), var(--tui-face-hi));
  box-shadow: 0 0 0 1px rgb(var(--tui-sh) / calc(var(--tui-sh-a) * 1.2)), 0 1px 0 var(--tui-hl), inset 0 1px 1px rgb(0 0 0 / 0.25);
}
.fq-holder-card {
  display: block;
  min-width: 140px;
  padding: 4px 14px 3px;
  border-radius: 2px;
  background: var(--fq-fibre), var(--fq-paper);
  box-shadow: inset 0 1px 2px rgb(0 0 0 / 0.25);
  font: 600 11.5px/16px var(--fq-type-face);
  letter-spacing: 0.09em;
  text-align: center;
  text-transform: uppercase;
  color: var(--fq-type);
}
.fq-pull {
  display: block;
  width: 116px;
  height: 24px;
  border-radius: 4px 4px 58px 58px / 4px 4px 24px 24px;
  background: var(--tui-well-fill) var(--tui-well);
  box-shadow: var(--tui-inset);
}

.fq-ask {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px 24px;
  margin-top: 28px;
  padding-inline: 4px;
}
.fq-note { font-size: 14.5px; color: var(--tui-ink-2); max-width: 44ch; }
.fq-key {
  display: inline-flex;
  align-items: center;
  height: 44px;
  padding: 0 24px;
  border-radius: 14px;
  font: 700 14px/1 var(--fq-sans);
  color: var(--tui-cap-ink);
  text-decoration: none;
  background:
    radial-gradient(120% 90% at 50% 0%, rgb(255 255 255 / 0.2), transparent 60%),
    linear-gradient(var(--tui-cap-hi), var(--tui-cap));
  box-shadow:
    inset 0 1px 0 var(--tui-cap-hl),
    0 3px 0 var(--tui-cap-skirt),
    0 4px 3px rgb(var(--tui-sh) / calc(var(--tui-sh-a) * 1.4)),
    0 9px 16px -6px rgb(var(--tui-sh) / var(--tui-sh-a));
  transition: transform 70ms var(--tui-ease), box-shadow 70ms var(--tui-ease);
}
.fq-key:active { transform: translateY(3px); box-shadow: var(--tui-pressed); }
.fq-key:focus-visible { outline: 2px solid var(--tui-focus); outline-offset: 3px; }

@container fq (max-width: 959px) {
  .fq-wrap { grid-template-columns: minmax(0, 1fr); }
  .fq-head { position: static; padding-top: 0; max-width: 640px; }
}
@container fq (max-width: 559px) {
  .fq-drawer { padding: 8px 8px 0; border-radius: 16px; }
  .fq-tray { padding: 34px 6px 14px; }
  .fq-card { margin-inline: calc(var(--depth, 0) * 3px); }
  .fq-edge { grid-template-columns: minmax(0, 1fr) auto; padding: 14px 14px 20px; font-size: 14px; line-height: 21px; }
  .fq-no { display: none; }
  .fq-tab { font-size: 9.5px; padding-inline: 8px; }
  .fq-face { margin-inline: 14px; padding-left: 0; font-size: 13.5px; }
  .fq-front { margin-inline: -8px; border-radius: 0 0 16px 16px; }
  .fq-ask { flex-direction: column; align-items: stretch; }
  .fq-key { justify-content: center; }
}

@media (prefers-reduced-motion: reduce) {
  .fq-card, .fq-mark::after, .fq-key, .fq-card::details-content { transition: none; }
  .fq-card:not([open]):hover { transform: none; }
}
`;
