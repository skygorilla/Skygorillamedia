<!DOCTYPE html>
<html lang="hr" dir="ltr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Glas Otoka — Strategija, zajednice i rješenja</title>
    <meta
      name="description"
      content="Strateški i operativni plan platforme Glas Otoka te pregled potreba zajednica Korčule, Mljeta, Lastova i Pelješca."
    />
    <!-- Open Graph / Twitter -->
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="hr_HR" />
    <meta property="og:title" content="Glas Otoka — Strategija, zajednice i rješenja" />
    <meta
      property="og:description"
      content="Strateški i operativni plan platforme Glas Otoka te pregled potreba zajednica Korčule, Mljeta, Lastova i Pelješca."
    />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="Glas Otoka — Strategija, zajednice i rješenja" />
    <meta
      name="twitter:description"
      content="Strateški i operativni plan platforme Glas Otoka te pregled potreba zajednica Korčule, Mljeta, Lastova i Pelješca."
    />

    <!-- JSON-LD: Organization + WebPage -->
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Glas Otoka — Strategija, zajednice i rješenja",
        "description": "Strateški i operativni plan platforme Glas Otoka te pregled potreba zajednica Korčule, Mljeta, Lastova i Pelješca.",
        "inLanguage": "hr-HR",
        "dateModified": "2025-10-28",
        "publisher": {
          "@type": "Organization",
          "name": "Skygorilla Media"
        }
      }
    </script>

    <!-- Calm, professional typography -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@400;500;600&display=swap"
      rel="stylesheet"
    />

    <script>
      // No-flash theme init (namespaced)
      (() => {
        const saved = localStorage.getItem("go-theme");
        document.addEventListener("DOMContentLoaded", () => {
          const root = document.querySelector(".go-root");
          if (!root) return;
          // Default to light for a more corporate deck feel
          root.dataset.theme = saved === "light" || saved === "dark" ? saved : "light";
        });
      })();
    </script>

    <style>
      /* =========================
       Glas Otoka — namespaced
       ========================= */
      .go-root {
        --go-font: "Inter", "Manrope", system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue",
          Arial, Noto Sans, emoji;
        --go-bg: #0c0d11;
        --go-text: #e6e9ec;
        --go-muted: #98a1ad;
        --go-panel: rgba(255, 255, 255, 0.04);
        --go-panel-strong: rgba(255, 255, 255, 0.08);
        --go-border: rgba(255, 255, 255, 0.12);
        --go-brand: #f0c14b; /* soft gold */
        --go-accent: #5abdc8; /* calm teal */
        --go-ok: #11c26d;
        --go-warn: #ffb02e;
        --go-err: #ff5a7a;
        --go-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        --go-r-lg: 12px;
        --go-r-sm: 10px;
        --go-pad: clamp(12px, 2vw, 24px);
        --go-content: 1180px;
        --go-speed: 200ms;
        background: var(--go-bg);
        color: var(--go-text);
        font-family: var(--go-font);
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      .go-root[data-theme="light"] {
        --go-bg: #f7f7f8;
        --go-text: #14171a;
        --go-muted: #65727f;
        --go-panel: rgba(0, 0, 0, 0.04);
        --go-panel-strong: rgba(0, 0, 0, 0.08);
        --go-border: rgba(0, 0, 0, 0.12);
        background: var(--go-bg);
      }

      /* Base elements */
      .go-root * {
        box-sizing: border-box;
      }
      .go-body {
        margin: 0;
      }
      /* Skip link for a11y */
      .go-skip {
        position: absolute;
        left: -9999px;
        top: 8px;
        z-index: 1000;
        background: var(--go-brand);
        color: #000;
        padding: 8px 12px;
        border-radius: 8px;
        border: 1px solid var(--go-border);
      }
      .go-skip:focus {
        left: 8px;
        outline: 2px solid var(--go-accent);
      }
      .go-shell {
        max-width: min(var(--go-content), 92vw);
        margin: 0 auto;
        padding: calc(var(--go-pad) * 1.2) var(--go-pad);
      }
      .go-a {
        color: var(--go-accent);
        text-decoration: none;
        transition: color var(--go-speed) ease;
      }
      .go-a:hover {
        text-decoration: underline;
      }
      .go-muted {
        color: var(--go-muted);
      }

      /* Header / hero */
      .go-hero {
        border-bottom: 1px solid var(--go-panel-strong);
      }
      .go-hero-inner {
        display: grid;
        grid-template-columns: 1.1fr 0.9fr;
        gap: clamp(16px, 3vw, 36px);
        align-items: center;
      }
      .go-badge {
        font-size: 11px;
        display: inline-flex;
        gap: 8px;
        align-items: center;
        padding: 7px 10px;
        border-radius: 999px;
        background: var(--go-panel);
        border: 1px solid var(--go-border);
        box-shadow: var(--go-shadow);
      }
      .go-title {
        font-weight: 600;
        letter-spacing: -0.01em;
        margin: 12px 0 6px;
        font-size: clamp(28px, 4vw, 42px);
      }
      .go-subtitle {
        color: var(--go-muted);
        font-weight: 400;
        font-size: clamp(15px, 1.8vw, 18px);
        max-width: 68ch;
      }

      .go-controls {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 16px;
      }
      .go-btn {
        appearance: none;
        border: 1px solid var(--go-border);
        background: transparent;
        color: inherit;
        padding: 10px 14px;
        border-radius: 999px;
        cursor: pointer;
        font-weight: 600;
        font-size: 13px;
        transition: background var(--go-speed), border-color var(--go-speed);
        box-shadow: none;
      }
      .go-btn:hover {
        background: var(--go-panel);
        border-color: var(--go-panel-strong);
      }
      .go-btn-primary {
        border-color: rgba(240, 193, 75, 0.35);
        background: rgba(240, 193, 75, 0.1);
      }

      .go-search {
        display: flex;
        gap: 10px;
        margin-top: 12px;
      }
      .go-search input {
        flex: 1;
        padding: 10px 12px;
        border-radius: 10px;
        border: 1px solid var(--go-panel-strong);
        background: var(--go-panel);
        color: inherit;
      }

      /* Layout grid: fixed vertical TOC + content */
      .go-grid {
        display: grid;
        grid-template-columns: 248px 1fr;
        gap: clamp(16px, 2.4vw, 32px);
        margin-top: clamp(20px, 3vw, 40px);
        align-items: start;
      }
      @media (max-width: 860px) {
        .go-hero-inner {
          grid-template-columns: 1fr;
        }
        .go-grid {
          grid-template-columns: 1fr;
        }
      }

      /* Sadržaj panel (bank-like, compact, no scroll inside) */
      .go-toc-panel {
        position: sticky;
        top: 16px;
        align-self: start;
        background: var(--go-panel);
        border: 1px solid var(--go-panel-strong);
        border-radius: 16px;
        padding: 12px 12px 10px;
        box-shadow: var(--go-shadow);
      }
      .go-toc-title {
        margin: 0 0 8px;
        font-size: 12px;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--go-muted);
      }
      .go-toc {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 2px;
      }
      .go-toc a {
        display: block;
        padding: 6px 10px;
        border-radius: 8px;
        color: var(--go-muted);
        text-decoration: none;
        border: 1px solid transparent;
        font-size: 14px;
        line-height: 1.3;
      }
      .go-toc a:hover {
        background: var(--go-panel-strong);
        color: var(--go-text);
      }
      .go-toc a.go-active {
        color: var(--go-accent);
        font-weight: 600;
        border-left: 3px solid var(--go-brand);
      }

      /* Cards + type */
      .go-card {
        background: var(--go-panel);
        border: 1px solid var(--go-panel-strong);
        border-radius: var(--go-r-lg);
        padding: clamp(16px, 2.2vw, 26px);
        margin-bottom: clamp(16px, 2.2vw, 26px);
      }
      .go-card h2 {
        margin: 0 0 8px;
        font-size: clamp(22px, 2.4vw, 28px);
        font-weight: 600;
        letter-spacing: -0.005em;
      }
      .go-card h3 {
        margin: 14px 0 6px;
        font-size: 12px;
        font-weight: 600;
        color: var(--go-muted);
        letter-spacing: 0.08em;
      }
      .go-p {
        margin: 10px 0;
        line-height: 1.7;
        font-size: 16px;
      }
      .go-pill {
        display: inline-block;
        padding: 3px 9px;
        font-size: 11px;
        font-weight: 600;
        color: var(--go-muted);
        border-radius: 999px;
        background: var(--go-panel-strong);
        border: 1px solid var(--go-border);
      }
      .go-details {
        border: 1px solid var(--go-panel-strong);
        border-radius: 10px;
        padding: 10px 12px;
        background: transparent;
        margin: 10px 0;
      }
      .go-details[open] {
        background: transparent;
      }
      .go-summary {
        cursor: pointer;
        font-weight: 500;
      }

      /* Tables (pricing) */
      .go-scrollbox {
        max-height: 240px;
        overflow: auto;
        padding: 0 8px 8px;
        border: 1px solid var(--go-panel-strong);
        border-radius: 12px;
        background: transparent;
      }
      .go-table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        table-layout: fixed;
      }
      .go-table th,
      .go-table td {
        padding: 10px 12px;
        text-align: left;
        vertical-align: top;
        word-break: break-word;
      }
      .go-table thead th {
        background: rgba(0, 0, 0, 0.06);
      }
      .go-root[data-theme="light"] .go-table thead th {
        background: rgba(0, 0, 0, 0.05);
      }
      .go-price {
        white-space: nowrap;
        font-weight: 600;
      }

      /* Bank-style tier cards */
      .go-bank {
        display: grid;
        grid-template-columns: repeat(3, minmax(220px, 1fr));
        gap: clamp(12px, 2vw, 20px);
      }
      @media (max-width: 900px) {
        .go-bank {
          grid-template-columns: 1fr;
        }
      }
      .go-tier {
        display: flex;
        flex-direction: column;
        gap: 10px;
        border: 1px solid var(--go-panel-strong);
        border-radius: 14px;
        padding: 16px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        overflow: hidden;
      }
      .go-tier--mini,
      .go-tier--std,
      .go-tier--pro {
        background: var(--go-panel);
      }
      .go-root[data-theme="light"] .go-tier--mini,
      .go-root[data-theme="light"] .go-tier--std,
      .go-root[data-theme="light"] .go-tier--pro {
        background: #ffffff;
      }
      .go-tier-line {
        width: 4px;
        height: 100%;
        background: var(--go-brand);
        border-radius: 6px;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0.9;
      }
      .go-tier-head {
        display: flex;
        align-items: center;
        gap: 8px;
        font-weight: 600;
        font-size: 18px;
      }
      .go-tier-desc {
        color: var(--go-text);
        opacity: 0.92;
        font-size: 14px;
      }
      .go-tier-list {
        margin: 0;
        padding: 0 0 0 18px;
        color: var(--go-text);
        opacity: 0.92;
        font-size: 14px;
      }
      .go-tier-price {
        font-size: 22px;
        font-weight: 600;
        color: var(--go-accent);
      }
      .go-tier .go-btn {
        align-self: flex-start;
      }

      /* Calculator */
      .go-calc-form {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 10px;
        max-width: 680px;
      }
      @media (max-width: 820px) {
        .go-calc-form {
          grid-template-columns: 1fr;
        }
      }
      .go-calc-form label {
        font-size: 13px;
        color: var(--go-muted);
        display: flex;
        flex-direction: column;
        gap: 6px;
      }
      .go-calc-form input,
      .go-calc-form select {
        background: var(--go-panel);
        color: inherit;
        border: 1px solid var(--go-panel-strong);
        border-radius: 10px;
        padding: 8px 10px;
        font: inherit;
      }
      .go-calc-out p {
        margin: 3px 0;
        font-size: 15px;
      }

      /* Footer + CTA */
      .go-footer {
        color: var(--go-muted);
        text-align: center;
        padding: 28px 0 48px;
      }
      .go-cta {
        display: none;
      }
      .go-dot {
        width: 8px;
        height: 8px;
        border-radius: 999px;
        background: var(--go-ok);
        box-shadow: 0 0 0 6px rgba(17, 194, 109, 0.15);
      }

      /* Print */
      @media print {
        .go-toc-panel,
        .go-controls,
        .go-cta,
        .go-search {
          display: none !important;
        }
        .go-shell {
          padding: 0;
        }
        .go-grid {
          grid-template-columns: 1fr;
        }
        .go-card {
          box-shadow: none;
          border-color: #ddd;
        }
      }
    </style>
  </head>
  <body class="go-body">
    <a class="go-skip" href="#go-content">Preskoči na sadržaj</a>
    <div class="go-root" data-theme="light">
      <!-- HEADER -->
      <header class="go-hero">
        <div class="go-shell go-hero-inner">
          <div>
            <span class="go-badge" aria-label="Project badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 2l2.39 4.84L20 7.27l-3.9 3.8.92 5.36L12 14.77 7.98 16.43l.92-5.36L5 7.27l5.61-.43L12 2z"
                  stroke="currentColor"
                  stroke-width="1.4"
                />
              </svg>
              Glas Otoka — platforma
            </span>
            <h1 class="go-title">Strategija, zajednice i rješenja</h1>
            <p class="go-subtitle">
              Strateški i operativni plan platforme Glas Otoka te pregled potreba zajednica Korčule,
              Mljeta, Lastova i Pelješca.
            </p>

            <div class="go-controls">
              <button class="go-btn" id="go-toggleTheme">Tema</button>
              <button class="go-btn" id="go-copyLink">Kopiraj link</button>
              <button class="go-btn" id="go-print">Ispiši</button>
              <button class="go-btn" id="go-expand">Otvori sve</button>
              <button class="go-btn" id="go-collapse">Zatvori sve</button>
              <a class="go-btn go-btn-primary" href="#go-pretplate">Pretplatnički modeli</a>
            </div>

            <div class="go-search" role="search">
              <input
                id="go-search"
                type="search"
                placeholder="Pretraži tekst (npr. 'bagatelna nabava', 'Mljet')[Enter]"
                aria-label="Pretraži sadržaj"
              />
            </div>
          </div>

          <div>
            <section class="go-card" aria-label="Sažetak prihoda">
              <h3>Struktura održivog financiranja</h3>
              <p><span class="go-pill">Primarni izvori</span></p>
              <ul>
                <li>
                  41.67% — Općine i TZ (sustavni javni ugovori, uključujući postupke
                  jednostavne/bagatelne nabave)
                </li>
                <li>29.17% — Pretplatnici: oglasi i sponzorstva</li>
                <li>20.00% — EU fondovi i projekti</li>
                <li>7.50% — Donacije i članstva</li>
              </ul>
              <p class="go-muted">
                Operativni ugovor daje nižu cijenu po objavi i predvidivost: npr. 12 promotivnih
                videa i prijenosa godišnje, uz jasne metrike isporuke.
              </p>
            </section>
          </div>
        </div>
      </header>

      <!-- MAIN -->
      <main class="go-shell go-grid">
        <!-- Left: TOC vertical panel -->
        <nav class="go-toc-panel" aria-label="Sadržaj">
          <h3 class="go-toc-title">Sadržaj</h3>
          <ul class="go-toc" id="go-toc"></ul>
        </nav>

        <!-- Right: Content -->
        <div id="go-content">
          <!-- 1 -->
          <section class="go-card" id="go-uvod">
            <h2>Uvod</h2>
            <p class="go-p">
              <strong>Glas Otoka</strong> nastaje iz terenske potrebe: postoji živ kulturni i
              društveni život, ali nedostaje trajna medijsko-komunikacijska struktura i arhiva.
            </p>
            <details class="go-details" open>
              <summary class="go-summary">Zašto sada</summary>
              <p class="go-p">
                Rješavamo fragmentiranu vidljivost kroz kontinuiran, profesionalan i pretraživ arhiv
                sadržaja.
              </p>
            </details>
            <details class="go-details">
              <summary class="go-summary">Refleksija na eksperiment (2021–2023.)</summary>
              <p class="go-p">
                Brza isporuka i kvalitetan vizualni standard potvrdili su spremnost zajednice na
                ovakav servis.
              </p>
            </details>
          </section>

          <!-- 2 -->
          <section class="go-card" id="go-izazovi">
            <h2>Kontekst & Izazovi</h2>
            <details class="go-details" open>
              <summary class="go-summary">Izolacija i fragmentacija</summary>
              <p class="go-p">
                Bez zajedničkog kanala, informacije ne dopiru do šire zajednice i dijaspore.
              </p>
            </details>
            <details class="go-details">
              <summary class="go-summary">Natječajni model financiranja</summary>
              <p class="go-p">
                Plaćanje po natječajima stvara diskontinuitet; pretplata daje predvidivost.
              </p>
            </details>
          </section>

          <!-- 3 -->
          <section class="go-card" id="go-uvidi">
            <h2>Uvidi iz prakse</h2>
            <p class="go-p">
              Sjednice GV, festivali, koncerti, lokalne priče — najviše koristi donosi brza obrada i
              distribucija.
            </p>
            <details class="go-details" open>
              <summary class="go-summary">Dostupnost i doseg</summary>
              <p class="go-p">
                Trenutačna dostupnost povećava uključivanje i spremnost na financiranje kvalitete.
              </p>
            </details>
          </section>

          <!-- 4 -->
          <section class="go-card" id="go-zasto_nema_lokalnog_medija">
            <h2>Zašto nema Lokalnog Medija?</h2>
            <details class="go-details" open>
              <summary class="go-summary">Povijesna bilješka</summary>
              <p class="go-p">
                Nedostaje stalna lokalna produkcija koja bi bilježila svakodnevne događaje, pružala
                digitalnu arhivu i stvarala osjećaj povezanosti stanovnika, dijaspore i
                posjetitelja.
              </p>
            </details>
          </section>

          <!-- 5 -->
          <section class="go-card" id="go-model_glas_otoka">
            <h2>Model "Glas Otoka"</h2>
            <details class="go-details" open>
              <summary class="go-summary">Servis pretplatnicima</summary>
              <p class="go-p">
                Kontinuirano informiranje, priče o inicijativama, live prijenosi i arhiva.
              </p>
            </details>
            <details class="go-details">
              <summary class="go-summary">Profesionalna produkcija</summary>
              <p class="go-p">
                Mobilan sustav + multitasking tim = visoka kvaliteta uz razuman trošak.
              </p>
            </details>
          </section>

          <!-- 6 -->
          <section class="go-card" id="go-tehnicka_rjesenja">
            <h2>Tehnička Rješenja</h2>
            <details class="go-details" open>
              <summary class="go-summary">Pouzdana terenska oprema</summary>
              <p class="go-p">Snimanje i prijenos prilagođeni terenskim uvjetima.</p>
            </details>
            <details class="go-details">
              <summary class="go-summary">Strukturirana isporuka</summary>
              <p class="go-p">
                Ugovor: promotivni video, streamovi, bilten, arhiva s metapodacima.
              </p>
            </details>
          </section>

          <!-- 7 -->
          <section class="go-card" id="go-korcula_fragmentacija">
            <h2>Korčula (Fragmentacija)</h2>
            <p class="go-p">
              <span class="go-pill">Što nude</span> Centar za kulturu, knjižnica, muzej, KUD-ovi,
              festivali.
            </p>
            <p class="go-p">
              <span class="go-pill">Što nedostaje</span> Centralizirani lokalni kanal.
            </p>
          </section>

          <!-- 8 -->
          <section class="go-card" id="go-mljet_megafon">
            <h2>Mljet (Megafon)</h2>
            <p class="go-p">
              <span class="go-pill">Što nude</span> NP Mljet, baština, etno-gastro, ronjenje.
            </p>
            <p class="go-p">
              <span class="go-pill">Što nedostaje</span> Centralizirani lokalni kanal.
            </p>
          </section>

          <!-- 9 -->
          <section class="go-card" id="go-lastovo_tisina">
            <h2>Lastovo (Tišina)</h2>
            <p class="go-p">
              <span class="go-pill">Što nude</span> Park prirode, Poklad, astroturizam, dječji
              programi.
            </p>
            <p class="go-p">
              <span class="go-pill">Što nedostaje</span> Centralizirani lokalni kanal.
            </p>
          </section>

          <!-- 10 -->
          <section class="go-card" id="go-peljesac_valorizacija">
            <h2>Pelješac (Valorizacija)</h2>
            <details class="go-details" open>
              <summary class="go-summary">Orebić — baština i vjetrosportovi</summary>
              <p class="go-p">
                Regate, procesije, vinari; potreban jači zimski program i digitalna prisutnost.
              </p>
            </details>
            <p class="go-p">
              <span class="go-pill">Što nude</span> Regate, procesije, vinari, vjetrosportovi.
            </p>
            <p class="go-p">
              <span class="go-pill">Što nedostaje</span> Centralizirani lokalni kanal.
            </p>
          </section>

          <!-- 11 -->
          <section class="go-card" id="go-operativa">
            <h2>Operativa</h2>
            <details class="go-details" open>
              <summary class="go-summary">Godišnji plan</summary>
              <ul>
                <li>Promotivni video/foto setovi</li>
                <li>Live prijenosi i sažeci</li>
                <li>Bilten i arhiva s metapodacima</li>
              </ul>
            </details>
          </section>

          <!-- 12 (BANK-STYLE TIERS) -->
          <section class="go-card" id="go-pretplate">
            <h2>Pretplatnički modeli — Glas Otoka</h2>
            <div class="go-bank">
              <!-- Mini -->
              <article class="go-tier go-tier--mini" aria-label="Mini">
                <div class="go-tier-head">Mini</div>
                <p class="go-tier-desc">
                  Osnovni paket za male udruge i inicijative kojima je potrebna osnovna vidljivost.
                </p>
                <ul class="go-tier-list">
                  <li>12 – 20 objava godišnje</li>
                  <li>osnovna obrada i objava</li>
                  <li>pretraživa arhiva i osnovna distribucija</li>
                </ul>
                <div class="go-tier-price">💶 600 – 900 € godišnje</div>
                <div class="go-tier-price">📹 ≈ 100 – 150 € / događaj</div>
                <a href="#go-kontakt" class="go-btn">➡️ Zatraži ponudu</a>
              </article>

              <!-- Standard -->
              <article class="go-tier go-tier--std" aria-label="Standard">
                <div class="go-tier-head">Standard</div>
                <p class="go-tier-desc">
                  Za aktivne zajednice i općine koje žele redovito praćenje i stabilnu prisutnost.
                </p>
                <ul class="go-tier-list">
                  <li>25 – 30 objava godišnje</li>
                  <li>redoviti sažeci i distribucija</li>
                  <li>osnovni live prijenosi</li>
                </ul>
                <div class="go-tier-price">💶 1 200 – 2 000 € godišnje</div>
                <div class="go-tier-price">📹 ≈ 150 – 300 € / događaj</div>
                <p class="go-muted" style="margin: 4px 0 0; font-weight: 600">
                  ⭐ Najtraženiji paket — optimalan omjer cijene i vrijednosti
                </p>
                <a href="#go-kontakt" class="go-btn">➡️ Dogovori sastanak</a>
              </article>

              <!-- Prošireni (was: Premium) -->
              <article class="go-tier go-tier--pro" aria-label="Prošireni">
                <div class="go-tier-head">Prošireni</div>
                <p class="go-tier-desc">
                  Za gradove i TZ-ove koji žele profesionalnu produkciju i stalnu medijsku
                  vidljivost.
                </p>
                <ul class="go-tier-list">
                  <li>30 – 40 objava + streamovi</li>
                  <li>prioritetna produkcija i prošireni storytelling</li>
                  <li>uključeni izvještaji i partnerski status</li>
                </ul>
                <div class="go-tier-price">💶 2 500 – 4 000 € godišnje</div>
                <div class="go-tier-price">📹 ≈ 200 – 400 € / događaj</div>
                <a href="#go-kontakt" class="go-btn go-btn-primary"
                  >➡️ Zatraži individualnu ponudu</a
                >
              </article>
            </div>
            <p class="go-muted" style="margin-top: 10px">
              🟢 Napomena: što je viša pretplata — to je niža cijena po događaju i veća medijska
              vrijednost (prioritetni termini, prošireni formati, stabilna godišnja suradnja).
            </p>
            <p class="go-muted" style="margin-top: 6px">
              Cijene su usklađene s postupkom jednostavne nabave; svaka isporuka ima zaseban račun.
            </p>

            <!-- Modeli pretplate — skrolabilna tablica -->
            <div
              class="go-scrollbox"
              role="region"
              aria-label="Modeli pretplate Glas Otoka"
              style="margin-top: 10px"
            >
              <table class="go-table" aria-label="Usporedba pretplatničkih modela">
                <thead>
                  <tr>
                    <th>Tip suradnje</th>
                    <th>Opis</th>
                    <th>Isporuke godišnje</th>
                    <th>Godišnja pretplata</th>
                    <th>Račun po isporuci</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <strong>Mini — “Simbolična”</strong><br /><span class="go-muted"
                        >mikro općine / TZ</span
                      >
                    </td>
                    <td>
                      Kontinuitet kanala (1–2 objave mjesečno, male reportaže, objave partnera).
                    </td>
                    <td>12–20 kratkih video/foto setova</td>
                    <td class="go-price">600 – 900 €</td>
                    <td class="go-price">100 – 150 €</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Standard — “Lokalna prisutnost”</strong><br /><span class="go-muted"
                        >općine / TZ srednje veličine</span
                      >
                    </td>
                    <td>Redovno praćenje aktivnosti, kulturnih i turističkih događaja.</td>
                    <td>25–30 priloga</td>
                    <td class="go-price">1.200 – 2.000 €</td>
                    <td class="go-price">150 – 300 €</td>
                  </tr>
                  <tr>
                    <td>
                      <strong>Prošireni — “Medijska podrška”</strong><br /><span class="go-muted"
                        >veći partneri</span
                      >
                    </td>
                    <td>
                      Planiranje sadržaja, prijenosi uživo, sažeci i višekanalna distribucija.
                    </td>
                    <td>30–40 priloga + streamovi</td>
                    <td class="go-price">2.500 – 4.000 €</td>
                    <td class="go-price">200 – 400 €</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p class="go-muted" style="margin-top: 6px">
              Savjet: Tablica je pomična — povucite ili koristite kotačić miša za pregled cijelog
              sadržaja.
            </p>
          </section>

          <!-- 13 -->
          <section class="go-card" id="go-pravila_pretplate_i_cijena">
            <h2>Pravila pretplate i cijena</h2>
            <details class="go-details" open>
              <summary class="go-summary">Fleksibilnost bez penala</summary>
              <p class="go-p">
                Prelazak na viši paket čim postane isplativiji; cijena po objavi ostaje
                pretplatnička.
              </p>
            </details>
            <details class="go-details">
              <summary class="go-summary">Prenošenje objava</summary>
              <p class="go-p">Do 2 neiskorištene objave prenose se u iduću godinu.</p>
            </details>
          </section>

          <!-- 14 (Calculator) -->
          <section class="go-card" id="go-kalkulator">
            <h2>Kalkulator pretplate</h2>
            <form class="go-calc-form" id="go-calc-form">
              <label
                >Broj događaja (ukupno)
                <input type="number" id="go-calc-events" min="0" max="60" value="0" />
              </label>
              <label
                >Trajanje ugovora (mjeseci)
                <input type="number" id="go-calc-months" min="1" max="12" value="12" />
              </label>
            </form>
            <div class="go-calc-out" id="go-calc-out" style="margin-top: 10px"></div>
            <p id="go-calc-reco" class="go-muted" style="margin-top: 6px"></p>
            <p class="go-muted">Napomena: prosjek pada kako raste volumen (tier popusti).</p>
          </section>

          <!-- 15 -->
          <section class="go-card" id="go-primjeri_u_praksi">
            <h2>Primjeri u praksi</h2>
            <div class="go-scrollbox" role="region" aria-label="Primjeri cijena">
              <table class="go-table">
                <thead>
                  <tr>
                    <th>Pretplatnik</th>
                    <th>Broj objava</th>
                    <th>Ukupni trošak</th>
                    <th>Prosjek po objavi</th>
                    <th>Model</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Mala udruga</td>
                    <td>6</td>
                    <td>600 € + 6×120 € = <strong>1.320 €</strong></td>
                    <td><strong>220 €</strong></td>
                    <td>Mini</td>
                  </tr>
                  <tr>
                    <td>TZ mjesta</td>
                    <td>15</td>
                    <td>1.200 € + 15×70 € = <strong>2.250 €</strong></td>
                    <td><strong>150 €</strong></td>
                    <td>Standard</td>
                  </tr>
                  <tr>
                    <td>Grad / velika TZ</td>
                    <td>30</td>
                    <td>2.400 € + 30×60 € = <strong>4.200 €</strong></td>
                    <td><strong>140 €</strong></td>
                    <td>Prošireni</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- 16 -->
          <section class="go-card" id="go-faq">
            <h2>Česta pitanja i odgovori</h2>
            <details class="go-details" open>
              <summary class="go-summary">Što pokriva godišnja pretplata?</summary>
              <p class="go-p">
                Planiranje, koordinaciju, arhivu, administraciju i tehničku podršku.
              </p>
            </details>
            <details class="go-details">
              <summary class="go-summary">Plaćanje u ratama?</summary>
              <p class="go-p">Moguće 2–4 rate godišnje. Svaka isporuka ima zaseban račun.</p>
            </details>
          </section>

          <!-- 17 -->
          <section class="go-card" id="go-cjenik_i_usluge">
            <h2>Cjenik i Usluge Skygorilla Media</h2>
            <div class="go-scrollbox" role="region" aria-label="Cjenik">
              <table class="go-table">
                <thead>
                  <tr>
                    <th>Usluga</th>
                    <th>Opis i isporuka</th>
                    <th>Cijena (EUR)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Video produkcija</strong></td>
                    <td>Promotivni spotovi (do 60 s), reportaže, korporativni video.</td>
                    <td class="go-price">od 500 €</td>
                  </tr>
                  <tr>
                    <td><strong>Glazbeni spot</strong></td>
                    <td>Koncept, snimanje na terenu, montaža.</td>
                    <td class="go-price">od 850 €</td>
                  </tr>
                  <tr>
                    <td><strong>Dokumentarna ili promotivna priča</strong></td>
                    <td>5–7 min, naracija/intervjui, lokalni storytelling.</td>
                    <td class="go-price">od 700 €</td>
                  </tr>
                  <tr>
                    <td><strong>Snimanje dronom</strong></td>
                    <td>Video + foto iz zraka; uključuje licencu i osiguranje.</td>
                    <td class="go-price">od 250 € <span class="go-muted">po lokaciji</span></td>
                  </tr>
                  <tr>
                    <td><strong>Vjenčano snimanje (video)</strong></td>
                    <td>Do 10 h + 3 isporuke (dugi/kratki/trailer).</td>
                    <td class="go-price">od 1.200 €</td>
                  </tr>
                  <tr>
                    <td><strong>Vjenčano fotografiranje</strong></td>
                    <td>Do 10 h, 500+ obrađenih fotografija u visokoj rezoluciji.</td>
                    <td class="go-price">od 800 €</td>
                  </tr>
                  <tr>
                    <td><strong>Fotografiranje apartmana</strong></td>
                    <td>20–30 fotografija optimiziranih za web i OTA; isporuka 24–48 h.</td>
                    <td class="go-price">120 – 180 €</td>
                  </tr>
                  <tr>
                    <td><strong>Video obilazak apartmana</strong></td>
                    <td>Walkthrough 60–90 s + 1 vertikalna verzija (Reels/Shorts).</td>
                    <td class="go-price">200 – 350 €</td>
                  </tr>
                  <tr>
                    <td><strong>Apartmani: foto i video</strong></td>
                    <td>Kombinirani paket (30+ foto + 60–90 s video).</td>
                    <td class="go-price">280 – 480 €</td>
                  </tr>
                  <tr>
                    <td><strong>Fotografiranje jelovnika i ambijenta</strong></td>
                    <td>20–40 fotografija jela/interijera + kratki ambijent kadrovi.</td>
                    <td class="go-price">160 – 300 €</td>
                  </tr>
                  <tr>
                    <td><strong>Virtualna tura 360°</strong></td>
                    <td>Do 8 POV točaka (smještaj/prostor) + embed.</td>
                    <td class="go-price">220 – 420 €</td>
                  </tr>
                  <tr>
                    <td><strong>Sakramenti: Prva pričest i Krizma (foto)</strong></td>
                    <td>Do 2 h, privatna online galerija za roditelje.</td>
                    <td class="go-price">150 – 250 €</td>
                  </tr>
                  <tr>
                    <td><strong>Sakramenti: video sažetak</strong></td>
                    <td>Sažetak 1–2 min; glazba i titlovi ključnih trenutaka.</td>
                    <td class="go-price">180 – 300 €</td>
                  </tr>
                  <tr>
                    <td><strong>Događaji: rođendani i priredbe (foto)</strong></td>
                    <td>1–2 h, 50–120 obrađenih fotografija, online galerija.</td>
                    <td class="go-price">120 – 220 €</td>
                  </tr>
                  <tr>
                    <td><strong>Snimka koncerta u cijelosti</strong></td>
                    <td>Single ili multi‑kamera; audio prema tonskoj režiji.</td>
                    <td class="go-price">600 – 1.200 €</td>
                  </tr>
                  <tr>
                    <td><strong>Brzi paket za društvene mreže</strong></td>
                    <td>10–15 vertikalnih kadrova za Reels/Shorts; titlovi i grafika.</td>
                    <td class="go-price">120 – 240 €</td>
                  </tr>
                  <tr>
                    <td><strong>3D mapiranje terena</strong></td>
                    <td>Ortofoto + 3D mreža + DSM/DTM (do 10 ha); preglednik.</td>
                    <td class="go-price">450 – 900 €</td>
                  </tr>
                  <tr>
                    <td><strong>Tehnička inspekcija dronom</strong></td>
                    <td>Krovovi/fasade/teško dostupne lokacije; 4K video + foto detalji.</td>
                    <td class="go-price">180 – 380 €</td>
                  </tr>
                  <tr>
                    <td><strong>Time‑lapse gradilišta</strong></td>
                    <td>Postava kamere + mjesečna kompilacija (min. 3 mj.)</td>
                    <td class="go-price">od 120 €/mj</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <!-- Kontakt -->
          <section class="go-card" id="go-kontakt">
            <h2>Kontakt</h2>
            <p class="go-p">Imate pitanje o pretplati ili ideju za suradnju? Javite se!</p>
            <form class="go-contact">
              <div style="display: grid; gap: 10px; grid-template-columns: 1fr 1fr">
                <div>
                  <label class="go-muted" for="go-ime">Ime / organizacija</label
                  ><input
                    id="go-ime"
                    type="text"
                    required
                    style="
                      width: 100%;
                      padding: 10px 12px;
                      border-radius: 10px;
                      border: 1px solid var(--go-panel-strong);
                      background: var(--go-panel);
                      color: inherit;
                    "
                  />
                </div>
                <div>
                  <label class="go-muted" for="go-email">E-mail</label
                  ><input
                    id="go-email"
                    type="email"
                    required
                    style="
                      width: 100%;
                      padding: 10px 12px;
                      border-radius: 10px;
                      border: 1px solid var(--go-panel-strong);
                      background: var(--go-panel);
                      color: inherit;
                    "
                  />
                </div>
              </div>
              <div style="margin-top: 10px">
                <label class="go-muted" for="go-tema">Tema</label>
                <input
                  id="go-tema"
                  type="text"
                  placeholder="npr. Pretplata Standard / Lastovski poklad"
                  style="
                    width: 100%;
                    padding: 10px 12px;
                    border-radius: 10px;
                    border: 1px solid var(--go-panel-strong);
                    background: var(--go-panel);
                    color: inherit;
                  "
                />
              </div>
              <div style="margin-top: 10px">
                <label class="go-muted" for="go-poruka">Poruka</label>
                <textarea
                  id="go-poruka"
                  rows="5"
                  required
                  style="
                    width: 100%;
                    padding: 10px 12px;
                    border-radius: 10px;
                    border: 1px solid var(--go-panel-strong);
                    background: var(--go-panel);
                    color: inherit;
                  "
                ></textarea>
              </div>
              <button type="submit" class="go-btn go-btn-primary" style="margin-top: 12px">
                Pošalji upit
              </button>
            </form>
            <p class="go-muted" style="margin-top: 12px; text-align: center">
              Za hitno:
              <a class="go-a" href="mailto:info.skygorilla@gmail.com">info.skygorilla@gmail.com</a>
            </p>
          </section>

          <footer class="go-footer">© 2025 • Glas Otoka — Skygorilla Media</footer>
        </div>
      </main>

      <!-- Floating CTA -->
      <div class="go-cta" aria-label="Brza navigacija">
        <span class="go-dot" aria-hidden="true"></span>
        <a href="#go-pretplate" class="go-btn" style="padding: 6px 10px">Pretplate</a>
        <a href="#go-kontakt" class="go-btn" style="padding: 6px 10px">Kontakt</a>
        <a href="#go-uvod" class="go-btn go-btn-primary" style="padding: 6px 10px">Pitch deck</a>
      </div>
    </div>

    <script>
      // Helper
      const goReady = (fn) =>
        document.readyState !== "loading"
          ? fn()
          : document.addEventListener("DOMContentLoaded", fn);

      goReady(() => {
        const root = document.querySelector(".go-root");
        if (!root) return;

        // Theme toggle
        const themeBtn = document.getElementById("go-toggleTheme");
        themeBtn?.addEventListener("click", () => {
          const next = root.dataset.theme === "light" ? "dark" : "light";
          root.dataset.theme = next;
          localStorage.setItem("go-theme", next);
        });

        // Copy link
        document.getElementById("go-copyLink")?.addEventListener("click", async () => {
          try {
            await navigator.clipboard.writeText(location.href);
            themeBtn?.blur();
          } catch {}
        });

        // Print
        document.getElementById("go-print")?.addEventListener("click", () => window.print());

        // Expand / Collapse all details
        const allDetails = () => [...root.querySelectorAll("details.go-details")];
        document
          .getElementById("go-expand")
          ?.addEventListener("click", () => allDetails().forEach((d) => (d.open = true)));
        document
          .getElementById("go-collapse")
          ?.addEventListener("click", () => allDetails().forEach((d) => (d.open = false)));

        // Build TOC (18 canonical sections)
        const toc = document.getElementById("go-toc");
        const ids = [
          ["Uvod", "go-uvod"],
          ["Kontekst & Izazovi", "go-izazovi"],
          ["Uvidi iz prakse", "go-uvidi"],
          ["Zašto nema Lokalnog Medija?", "go-zasto_nema_lokalnog_medija"],
          ['Model "Glas Otoka"', "go-model_glas_otoka"],
          ["Tehnička Rješenja", "go-tehnicka_rjesenja"],
          ["Korčula (Fragmentacija)", "go-korcula_fragmentacija"],
          ["Mljet (Megafon)", "go-mljet_megafon"],
          ["Lastovo (Tišina)", "go-lastovo_tisina"],
          ["Pelješac (Valorizacija)", "go-peljesac_valorizacija"],
          ["Operativa", "go-operativa"],
          ["Pretplatnički modeli — Glas Otoka", "go-pretplate"],
          ["Pravila pretplate i cijena", "go-pravila_pretplate_i_cijena"],
          ["Kalkulator pretplate", "go-kalkulator"],
          ["Primjeri u praksi", "go-primjeri_u_praksi"],
          ["Česta pitanja i odgovori", "go-faq"],
          ["Cjenik i Usluge Skygorilla Media", "go-cjenik_i_usluge"],
          ["Kontakt", "go-kontakt"],
        ];
        ids.forEach(([label, id]) => {
          const sec = document.getElementById(id);
          const li = document.createElement("li");
          if (sec) {
            const a = document.createElement("a");
            a.href = `#${id}`;
            a.textContent = label;
            li.appendChild(a);
          } else {
            const span = document.createElement("span");
            span.textContent = label;
            span.style.opacity = 0.6;
            li.appendChild(span);
          }
          toc?.appendChild(li);
        });

        // Update TOC title with section count
        const tocTitleEl = root.querySelector(".go-toc-title");
        const sectionCount = ids.filter(([, id]) => document.getElementById(id)).length;
        if (tocTitleEl && sectionCount) {
          tocTitleEl.textContent = `Sadržaj (${sectionCount})`;
        }

        // Active highlight with IntersectionObserver
        const sections = ids.map(([, id]) => document.getElementById(id)).filter(Boolean);
        if (sections.length) {
          const io = new IntersectionObserver(
            (entries) => {
              const top = entries
                .filter((e) => e.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
              if (!top) return;
              const targetId = top.target.id;
              toc.querySelectorAll("a").forEach((a) => {
                a.classList.remove("go-active");
                a.removeAttribute("aria-current");
              });
              const link = toc.querySelector(`[href="#${targetId}"]`);
              if (link) {
                link.classList.add("go-active");
                link.setAttribute("aria-current", "true");
                history.replaceState(null, "", `#${targetId}`);
              }
            },
            { threshold: [0.6], rootMargin: "-40% 0px -50% 0px" }
          );
          sections.forEach((sec) => io.observe(sec));
        }

        // Search (Enter highlights)
        const s = document.getElementById("go-search");
        s?.addEventListener("keydown", (e) => {
          if (e.key !== "Enter") return;
          const q = s.value.trim().toLowerCase();
          const cards = [...root.querySelectorAll("#go-content > section.go-card")];
          let first = null;
          cards.forEach((c) => {
            const hit = q && c.textContent.toLowerCase().includes(q);
            c.style.outline = hit ? "2px solid rgba(240,193,75,.55)" : "";
            if (hit && !first) first = c;
          });
          first?.scrollIntoView({ behavior: "smooth", block: "start" });
        });

        // Click-to-deeplink on H2
        root.querySelectorAll("#go-content section.go-card h2").forEach((h2) => {
          h2.style.cursor = "pointer";
          h2.title = "Kopiraj link na ovo poglavlje";
          h2.addEventListener("click", async () => {
            const id = h2.closest("section")?.id;
            if (!id) return;
            history.replaceState(null, "", `#${id}`);
            try {
              await navigator.clipboard.writeText(location.href);
            } catch {}
            h2.animate([{ opacity: 1 }, { opacity: 0.5 }, { opacity: 1 }], { duration: 400 });
          });
        });

        // Contact form — mailto (no backend)
        root.querySelector(".go-contact")?.addEventListener("submit", (e) => {
          e.preventDefault();
          const ime = root.querySelector("#go-ime")?.value?.trim() || "";
          const email = root.querySelector("#go-email")?.value?.trim() || "";
          const tema = root.querySelector("#go-tema")?.value?.trim() || "";
          const poruka = root.querySelector("#go-poruka")?.value?.trim() || "";
          const subject = encodeURIComponent(`Kontakt — ${tema || "Upit"}`);
          const body = encodeURIComponent(
            `Ime/organizacija: ${ime}\nEmail: ${email}\nTema: ${tema}\n\n${poruka}`
          );
          location.href = `mailto:info.skygorilla@gmail.com?subject=${subject}&body=${body}`;
        });

        // Calculator logic (tiered marginal rates + auto recommendation)
        const out = document.getElementById("go-calc-out");
        const reco = document.getElementById("go-calc-reco");
        const form = document.getElementById("go-calc-form");

        const PLANS = {
          mini: {
            label: "Mini",
            base: 750,
            included: 16,
            tiers: [
              { upto: 10, rate: 125 },
              { upto: 20, rate: 115 },
              { upto: Infinity, rate: 99 },
            ],
          },
          standard: {
            label: "Standard",
            base: 1600,
            included: 28,
            tiers: [
              { upto: 10, rate: 110 },
              { upto: 20, rate: 99 },
              { upto: Infinity, rate: 89 },
            ],
          },
          premium: {
            label: "Prošireni",
            base: 3200,
            included: 36,
            tiers: [
              { upto: 10, rate: 90 },
              { upto: 20, rate: 79 },
              { upto: Infinity, rate: 70 },
            ],
          },
        };

        function calcPlan(planKey, totalDesired) {
          const p = PLANS[planKey];
          const extra = Math.max(0, totalDesired - p.included);
          let remaining = extra;
          let extraCost = 0,
            counted = 0;
          const breakdown = [];
          for (const t of p.tiers) {
            if (remaining <= 0) break;
            const cap = t.upto === Infinity ? Infinity : Math.max(0, t.upto - counted);
            const take = Math.min(remaining, cap);
            if (take > 0) {
              breakdown.push({ count: take, rate: t.rate });
              extraCost += take * t.rate;
              remaining -= take;
              counted += take;
            }
          }
          const total = p.base + extraCost;
          const items = Math.max(0, totalDesired);
          const avg = items > 0 ? total / items : 0;
          return {
            key: planKey,
            plan: p.label,
            base: p.base,
            included: p.included,
            extra,
            extraCost,
            breakdown,
            total,
            avg,
          };
        }

        function rankPlans(totalDesired) {
          const results = Object.keys(PLANS).map((k) => calcPlan(k, totalDesired));
          results.sort((a, b) => a.total - b.total);
          return results;
        }

        const fmt = (n) => `${Math.round(n).toFixed(0)} €`;

        const calc = () => {
          const events = Math.max(
            0,
            Math.min(60, parseInt(document.getElementById("go-calc-events").value) || 0)
          );
          const months = Math.max(
            1,
            Math.min(12, parseInt(document.getElementById("go-calc-months").value) || 12)
          );

          if (events === 0) {
            out.innerHTML = `
            <table class="go-table">
              <thead><tr><th>Plan</th><th>Pretplata</th><th>Uključeno</th><th>Dodatno</th><th>Ukupno</th><th>Prosjek</th><th>Mjesečno</th></tr></thead>
              <tbody>
                ${Object.keys(PLANS)
                  .map(
                    (k) => `
                  <tr><td>${PLANS[k].label}</td><td>0 €</td><td>${PLANS[k].included}</td><td>0</td><td>0 €</td><td>0 €</td><td>0 € / mj</td></tr>
                `
                  )
                  .join("")}
              </tbody>
            </table>`;
            if (reco) reco.textContent = "";
            return;
          }

          const ranked = rankPlans(events);
          out.innerHTML = `
          <table class="go-table">
            <thead><tr><th>Plan</th><th>Pretplata</th><th>Uključeno</th><th>Dodatno</th><th>Ukupno</th><th>Prosjek</th><th>Mjesečno</th></tr></thead>
            <tbody>
              ${ranked
                .map((r, i) => {
                  const monthly = r.total / months;
                  return `<tr${i === 0 ? ' style="font-weight:600;"' : ""}>
                  <td>${r.plan}${i === 0 ? " ⭐" : ""}</td>
                  <td>${fmt(r.base)}</td>
                  <td>${r.included}</td>
                  <td>${r.extra}</td>
                  <td><strong>${fmt(r.total)}</strong></td>
                  <td>${fmt(r.avg)}</td>
                  <td>${fmt(monthly)} / mj</td>
                </tr>`;
                })
                .join("")}
            </tbody>
          </table>`;

          if (reco) {
            const best = ranked[0];
            const alt = ranked[1];
            if (best && alt) {
              reco.textContent = `Preporuka: Za ${events} događaja godišnje ${
                best.plan
              } je povoljniji: ${Math.round(best.total)} € (≈ ${Math.round(
                best.avg
              )} €/dog.) u odnosu na ${alt.plan} ${Math.round(alt.total)} €.`;
            } else {
              reco.textContent = "";
            }
          }
        };

        form?.addEventListener("input", calc);
        calc();

        // Napomena: Tablice "Primjeri u praksi" i "Modeli pretplate" su sada statične i usklađene s danim cijenama.
      });
    </script>
  </body>
</html>
```
