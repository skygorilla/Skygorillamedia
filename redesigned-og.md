<!DOCTYPE html>
<html lang="hr" dir="ltr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Glas Otoka — Centralizirani lokalni kanal</title>
  <meta name="description" content="Strateški i operativni model za kontinuitet lokalnih priča, događaja i streamova Korčule, Mljeta, Lastova i Pelješca." />
  <!-- Open Graph / Twitter -->
  <meta property="og:title" content="Glas Otoka — Centralizirani lokalni kanal" />
  <meta property="og:description" content="Strateški i operativni model za kontinuitet lokalnih priča, događaja i streamova Korčule, Mljeta, Lastova i Pelješca." />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="hr_HR" />
  <meta property="og:image" content="../assets/img/Welcome/1067-720x500.jpg" />
  <meta name="twitter:image" content="../assets/img/Welcome/1067-720x500.jpg" />
  <meta name="theme-color" content="#E30613" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Glas Otoka — Centralizirani lokalni kanal" />
  <meta name="twitter:description" content="Strateški i operativni model za kontinuitet lokalnih priča, događaja i streamova Korčule, Mljeta, Lastova i Pelješca." />

  <!-- Feeds -->
  <link rel="alternate" type="application/rss+xml" title="Glas Otoka (RSS)" href="feed.xml" />
  <link rel="alternate" type="application/feed+json" title="Glas Otoka (JSON Feed)" href="feed.json" />

  <!-- Structured data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Skygorilla Media — Glas Otoka",
    "alternateName": "Glas Otoka",
    "areaServed": ["Korčula", "Mljet", "Lastovo", "Pelješac"]
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Glas Otoka — Centralizirani lokalni kanal",
    "description": "Strateški i operativni model za kontinuitet lokalnih priča, događaja i streamova Korčule, Mljeta, Lastova i Pelješca.",
    "inLanguage": "hr-HR"
  }
  </script>
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Što pokriva godišnja pretplata?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Planiranje, koordinaciju, arhivu, administraciju i tehničku podršku."
        }
      },
      {
        "@type": "Question",
        "name": "Plaćanje u ratama?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Moguće 2–4 rate godišnje. Svaka isporuka ima zaseban račun."
        }
      }
    ]
  }
  </script>
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700&family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">

  <style>
    /* =============================
       DESIGN TOKENS (neutral, no bank names)
       ============================= */
    :root{
      --color-primary:#E30613; /* brand red */
      --color-primary-dark:#C30010;
      --color-text:#333333;    /* body text */
      --color-muted:#666666;   /* secondary text */
      --color-bg:#FFFFFF;      /* page background */
      --color-bg-soft:#F7F7F8; /* soft sections */
      --color-border:#E0E0E0;  /* dividers */
      --color-success:#00A859;
      --color-warn:#FF8C00;
      --color-info:#0066CC;

      --radius:10px;
      --radius-lg:14px;
      --shadow-sm:0 2px 8px rgba(0,0,0,.08);
      --shadow-lg:0 8px 26px rgba(0,0,0,.10);

      --space-1:8px;  --space-2:12px; --space-3:16px; --space-4:24px; --space-5:32px; --space-6:48px; --space-7:64px;

      --font-body:'Open Sans',system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
      --font-head:'Montserrat',system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
    }

    /* Base */
    *{box-sizing:border-box}
    html{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
    body{margin:0;background:var(--color-bg);color:var(--color-text);font:400 16px/1.6 var(--font-body)}
    img{max-width:100%;height:auto}
    a{color:var(--color-primary);text-decoration:none}
    a:hover{text-decoration:underline}

    /* Layout helpers */
    .container{max-width:1200px;margin:0 auto;padding:0 var(--space-4)}
    .section{padding:var(--space-7) 0}
    .grid{display:grid;gap:var(--space-4)}
    .grid.cols-2{grid-template-columns:repeat(2,1fr)}
    .grid.cols-3{grid-template-columns:repeat(3,1fr)}
    @media (max-width:900px){.grid.cols-2,.grid.cols-3{grid-template-columns:1fr}}

    /* Typography */
    h1,h2,h3,h4{font-family:var(--font-head);margin:0 0 var(--space-2)}
    h1{font-weight:700;font-size:42px;line-height:1.15}
    h2{font-weight:600;font-size:30px;line-height:1.2}
    h3{font-weight:600;font-size:22px;line-height:1.3}
    .muted{color:var(--color-muted)}

    /* Cards & Buttons */
  .card{background:#fff;border:1px solid var(--color-border);border-radius:var(--radius);box-shadow:var(--shadow-sm);padding:var(--space-4)}
  .card:hover{box-shadow:0 10px 26px rgba(0,0,0,.12); transform:translateY(-2px); transition:transform .2s ease, box-shadow .2s ease}
    .btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:12px 24px;border-radius:999px;font:600 16px var(--font-head);cursor:pointer;transition:all .25s;border:2px solid transparent;text-decoration:none}
    .btn.primary{background:var(--color-primary);color:#fff}
    .btn.primary:hover{background:var(--color-primary-dark);box-shadow:0 10px 22px rgba(227,6,19,.25)}
  .btn.outline{background:transparent;color:var(--color-primary);border-color:var(--color-primary)}
  .btn.outline:hover{background:var(--color-primary);color:#fff}
  .btn:focus-visible, .go-calc__pill:focus-visible, a:focus-visible{outline:3px solid rgba(227,6,19,.35); outline-offset:3px; border-radius:10px}

    /* Inputs */
    input,select,textarea{width:100%;border:1px solid var(--color-border);border-radius:var(--radius);padding:12px 14px;font:16px/1.4 var(--font-body);transition:border .2s, box-shadow .2s}
    input:focus,select:focus,textarea:focus{outline:none;border-color:var(--color-primary);box-shadow:0 0 0 3px rgba(227,6,19,.12)}

    /* Header */
    .site-header{background:linear-gradient(135deg,var(--color-primary) 0%,var(--color-primary-dark) 100%);color:#fff}
    .site-header__bar{display:flex;align-items:center;justify-content:space-between;padding:14px 0}
    .brand{font:700 20px var(--font-head);letter-spacing:.3px}
  .nav{display:flex;gap:18px}
  .nav a{color:#fff}
  /* Sticky header: keep palette, add blur/shadow on scroll */
  .site-header{position:sticky; top:0; z-index:50; backdrop-filter:saturate(1.05)}
  .site-header.is-scrolled{box-shadow:var(--shadow-lg); background:linear-gradient(135deg, rgba(227,6,19,.96) 0%, rgba(195,0,16,.96) 100%)}

    /* Hero */
    .hero{background:linear-gradient(180deg,#fff 0%,#F8F8F8 100%);text-align:center}
    .hero .container{max-width:920px}
  .hero__title{margin-bottom:var(--space-2)}
  .hero__subtitle{color:var(--color-muted);margin-bottom:var(--space-4)}
  /* Hero subtle accent keeping palette */
  .hero{position:relative; overflow:hidden}
  .hero::before{content:""; position:absolute; inset:auto -20%  -30% -20%; height:60%; background:radial-gradient(60% 60% at 50% 0%, rgba(227,6,19,.08), rgba(227,6,19,0)); filter:blur(14px); pointer-events:none}
  /* Section heading accent */
  .card > h2{position:relative; padding-bottom:6px}
  .card > h2::after{content:""; position:absolute; left:0; bottom:0; width:56px; height:3px; background:linear-gradient(90deg,var(--color-primary), rgba(227,6,19,.2)); border-radius:2px}

    /* Pill notes */
    .pill{display:inline-block;border:1px solid var(--color-border);border-radius:999px;padding:6px 10px;background:#fff;box-shadow:var(--shadow-sm);font-weight:600;font-size:13px;color:var(--color-muted)}

    /* Footer */
    .site-footer{background:#0E0E0E;color:#EDEDED;border-top:4px solid var(--color-primary);padding:var(--space-6) 0 var(--space-4)}
    .site-footer a{color:#fff}
    .footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:var(--space-5)}
    @media(max-width:1000px){ .footer-grid{ grid-template-columns:1fr 1fr; } }
    @media(max-width:640px){ .footer-grid{ grid-template-columns:1fr; } }
    .footer-brand h3{font:700 20px var(--font-head);margin:0 0 6px;letter-spacing:.3px}
    .footer-brand p{ margin:0; color:#C9C9C9; }
    .footer-badges{ display:flex; gap:12px; margin-top:12px; flex-wrap:wrap; }
    .badge{ border:1px solid #262626; color:#CFCFCF; background:#141414; border-radius:999px; padding:8px 12px; font:600 13px var(--font-head); }
    .footer-col h4{ font:600 14px var(--font-head); letter-spacing:.4px; text-transform:uppercase; color:#FFFFFF; margin:0 0 10px; }
    .footer-list{ list-style:none; padding:0; margin:0; display:grid; gap:8px; }
    .footer-list a{ color:#D8D8D8; text-decoration:none; }
    .footer-list a:hover{ color:var(--color-primary); }
    .footer-news form{ display:grid; gap:10px; background:#121212; border:1px solid #262626; border-radius:var(--radius); padding:12px; }
    .footer-news input{ background:#0E0E0E; color:#fff; border:1px solid #2A2A2A; }
    .footer-news input::placeholder{ color:#9B9B9B; }
    .footer-news .btn{ padding:10px 16px; font-size:15px; }
    .footer-social{ display:flex; gap:12px; margin-top:12px; }
    .footer-social a{ width:38px; height:38px; display:inline-grid; place-items:center; border-radius:999px; border:1px solid #262626; background:#141414; }
    .footer-social a:hover{ border-color:var(--color-primary); }
    .footer-bottom{ border-top:1px solid #1F1F1F; margin-top:var(--space-5); padding-top:var(--space-3); display:flex; gap:12px; flex-wrap:wrap; justify-content:space-between; align-items:center; font-size:14px; color:#C9C9C9; }
    .back-to-top{ display:inline-flex; align-items:center; gap:8px; border:1px solid #2A2A2A; background:#131313; color:#EDEDED; padding:8px 12px; border-radius:999px; text-decoration:none; }

    /* =====================
       NEW CALCULATOR (pills)
       ===================== */
    .go-calc{background:var(--color-bg-soft);border-top:1px solid var(--color-border)}
    .go-calc__wrap{display:grid;grid-template-columns:1.1fr .9fr;gap:var(--space-4)}
    .go-calc__card{background:#fff;border:1px solid var(--color-border);border-radius:var(--radius-lg);box-shadow:var(--shadow-lg);padding:20px}
    .go-calc__title{font-family:var(--font-head);font-size:24px;margin:0 0 6px}
    .go-calc__muted{color:var(--color-muted);margin:0 0 16px}
    .go-calc__row{display:grid;grid-template-columns:1fr 1fr;gap:16px}
    .go-calc label{display:block;font-weight:600;margin:8px 0 6px;font-family:var(--font-head)}
    .go-calc .help{color:var(--color-muted);font-size:13px;margin-top:4px}
    .go-calc input[type="range"]{accent-color:var(--color-primary)}
    .go-calc__pill{border:1px solid var(--color-border);border-radius:999px;padding:10px 14px;text-align:center;cursor:pointer;font-weight:600;transition:all .3s;user-select:none}
    .go-calc__pill[aria-pressed="true"]{background:var(--color-primary);color:#fff;border-color:var(--color-primary)}
    .go-calc__grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
    .go-calc__stat{border:1px dashed var(--color-border);border-radius:var(--radius-lg);padding:14px}
    .go-calc__stat small{display:block;color:var(--color-muted)}
    .go-calc__big{font:700 28px var(--font-head)}
    .go-calc__cta{display:flex;gap:12px;flex-wrap:wrap;margin-top:10px}
    .note.ok{color:var(--color-success)}
    .note.warn{color:var(--color-warn)}
    .note.info{color:var(--color-info)}
    @media(max-width:980px){.go-calc__wrap{grid-template-columns:1fr}}

    /* Utility */
    .visually-hidden{position:absolute!important;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;border:0}

    /* Tables & scroll containers (for imported static content) */
    .scrollbox{max-height:260px;overflow:auto;border:1px solid var(--color-border);border-radius:12px;padding:0 8px 8px;background:transparent}
    .table{width:100%;border-collapse:separate;border-spacing:0;table-layout:fixed}
    .table th,.table td{padding:10px 12px;text-align:left;vertical-align:top;word-break:break-word;border-bottom:1px dashed var(--color-border)}
  .table thead th{background:#F2F2F4;color:#111; position:sticky; top:0; z-index:1}
    .scroll-hint{color:var(--color-muted);font-size:14px;margin-top:6px}
    /* Mini TOC active state */
    #mini-toc a{display:inline-block;border:1px solid var(--color-border);border-radius:999px;padding:6px 10px;color:inherit;text-decoration:none}
    #mini-toc a:hover{border-color:var(--color-primary)}
    #mini-toc a.active{border-color:var(--color-primary);color:var(--color-primary);background:#fff}
    /* Sticky TOC card */
    .toc-card{position:sticky; top:16px; z-index:2}
    /* Scroll indicator */
    .scroll-indicator{display:inline-flex;align-items:center;gap:8px;color:var(--color-muted);text-decoration:none;margin-top:8px}
    .scroll-indicator svg{opacity:.7}
    .scroll-indicator:hover{color:var(--color-primary)}
    /* Two-column layout for Sadržaj + Sekcije */
    #sadrzaj .container{display:grid;grid-template-columns:minmax(240px,300px) 1fr;gap:var(--space-4);align-items:start}
    @media(max-width:980px){#sadrzaj .container{display:block}}
    #sadrzaj .toc-card{grid-column:1}
    #sadrzaj .container > .card:not(.toc-card){grid-column:2}
    /* Better anchor scroll position */
    .card[id]{scroll-margin-top:80px}
    /* Comfortable line length inside cards without affecting tables */
    .card p{max-width:70ch}
    .card .table p{max-width:none}
    /* Anchor link for headings */
    .anchor-link{margin-left:8px; opacity:0; transition:opacity .15s; font-size:14px; vertical-align:middle; text-decoration:none; color:var(--color-muted)}
    .card > h2:hover .anchor-link, .card > h2:focus-within .anchor-link{opacity:1}

    /* Floating back-to-top (desktop only) */
    .floating-top{position:fixed; right:18px; bottom:24px; display:none; gap:8px; align-items:center; z-index:60}
    @media(min-width:981px){ .floating-top{display:inline-flex} }
    .floating-top[hidden]{display:none!important}

    /* Skip link for keyboard users */
    .skip-link{position:absolute; left:-9999px; top:auto; width:1px; height:1px; overflow:hidden}
    .skip-link:focus{left:16px; top:12px; width:auto; height:auto; background:#fff; color:#111; padding:8px 12px; border-radius:999px; border:2px solid var(--color-primary); z-index:100}

    /* Print styles for a pitch-ready PDF */
    @media print{
      *{box-shadow:none!important; text-shadow:none!important}
      a{color:#111!important; text-decoration:none!important}
      .site-header, .nav, .footer-grid, .footer-bottom, .scroll-indicator, .floating-top{display:none!important}
      .section{padding:16px 0!important}
      .card{border:1px solid #DDD!important; page-break-inside:avoid; break-inside:avoid}
      .card > h2::after{background:#111!important}
    }
  </style>
</head>
<body>
  <a href="#sadrzaj" class="skip-link">Preskoči na sadržaj</a>

  <!-- ================= HEADER ================= -->
  <header class="site-header" role="banner">
    <div class="container site-header__bar">
      <div class="brand">Glas Otoka</div>
      <nav class="nav" role="navigation" aria-label="Glavna navigacija">
        <a href="#uvod">Uvod</a>
        <a href="#go-calculator">Kalkulator</a>
        <a href="#pretplate">Pretplate</a>
        <a href="#kontakt">Kontakt</a>
      </nav>
    </div>
  </header>

  <!-- ================= HERO ================= -->
  <section id="uvod" class="hero section">
    <div class="container">
      <span class="pill">Glas Otoka — platforma</span>
      <h1 class="hero__title">Centralizirani lokalni kanal</h1>
      <p class="hero__subtitle">Strateški i operativni model za kontinuitet lokalnih priča, događaja i streamova Korčule, Mljeta, Lastova i Pelješca.</p>
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:8px">
        <a class="btn primary" href="#go-calculator">Izračunaj plan</a>
        <a class="btn outline" href="#pretplate">Pretplatnički modeli</a>
        <button id="btn-print" class="btn outline" type="button">Spremi kao PDF</button>
        <button id="btn-share" class="btn outline" type="button">Podijeli</button>
      </div>
      <div style="margin-top:10px">
        <a class="scroll-indicator" href="#go-calculator" aria-label="Pomakni na kalkulator">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 16.5 5.5 10l1.4-1.4L12 13.7l5.1-5.1L18.5 10 12 16.5Z"/></svg>
          Pomakni za više
        </a>
      </div>
    </div>
  </section>

  <!-- ================= MAIN ================= -->
  <main>
    <!-- ===== Calculator ===== -->
    <section class="go-calc section" id="go-calculator" aria-labelledby="calc-title">
      <div class="container go-calc__wrap">
        <div class="go-calc__card">
          <h2 id="calc-title" class="go-calc__title">Kalkulator — Mini / Standard / Prošireni</h2>
          <p class="go-calc__muted">Unesi očekivani broj isporuka godišnje i odaberi paket. Cijene su okvirne (partnerske).</p>

          <div class="go-calc__plan" role="group" aria-label="Odabir paketa">
            <button class="go-calc__pill" data-plan="mini" aria-pressed="true">Mini</button>
            <button class="go-calc__pill" data-plan="standard" aria-pressed="false">Standard</button>
            <button class="go-calc__pill" data-plan="prosireni" aria-pressed="false">Prošireni</button>
          </div>

          <div class="go-calc__row" style="margin-top:16px">
            <div>
              <label for="go-events">Broj isporuka godišnje</label>
              <input id="go-events" type="range" min="0" max="60" step="1" value="12" aria-describedby="go-events-help">
              <div class="help" id="go-events-help"><span id="go-events-out">12</span> isporuka / godinu</div>
            </div>
            <div>
              <label for="go-sub-fee">Godišnja pretplata (€)</label>
              <input id="go-sub-fee" type="number" value="900" inputmode="numeric">
              <div class="help">Raspon po paketu: <span id="go-sub-range">Mini 600–900</span></div>
            </div>
          </div>

          <div class="go-calc__row">
            <div>
              <label for="go-per-price">Trenutna cijena po isporuci (€)</label>
              <input id="go-per-price" type="number" readonly value="120" inputmode="numeric">
              <div class="help">Marginalne stope: <span id="go-per-range">1–20: 150 • 21–30: 100 • 31+: 70</span></div>
            </div>
            <div>
              <label for="go-adhoc">Ad-hoc usporedba (€ / isporuka)</label>
              <input id="go-adhoc" type="number" value="220" inputmode="numeric">
              <div class="help">Ad-hoc = jednokratna usluga bez pretplate (ne uključuje planiranje/arhivu)</div>
            </div>
          </div>

          <div class="go-calc__cta">
            <button class="btn primary" id="go-suggest">Predloži isplativiji paket</button>
            <button class="btn outline" id="go-reset" type="button">Reset</button>
          </div>

          <p class="muted" style="margin-top:8px">Pretplata pokriva planiranje, arhivu i koordinaciju; svaka isporuka se fakturira po partnerskoj cijeni.</p>
        </div>

        <div class="go-calc__card" aria-live="polite">
          <h2 class="go-calc__title">Rezultati</h2>
          <div class="go-calc__grid">
            <div class="go-calc__stat">
              <small>EUR/god</small>
              <div class="go-calc__big"><span id="go-year">0</span></div>
            </div>
            <div class="go-calc__stat">
              <small>EUR/mj</small>
              <div class="go-calc__big"><span id="go-month">0</span></div>
            </div>
          </div>
          <div class="go-calc__grid">
            <div class="go-calc__stat">
              <small>Fiksno (pretplata)</small>
              <div class="go-calc__big"><span id="go-sub">0</span> EUR</div>
            </div>
            <div class="go-calc__stat">
              <small>Varijabilno (isporuke)</small>
              <div class="go-calc__big"><span id="go-var">0</span> EUR</div>
            </div>
          </div>
          <p class="note" id="go-savings"></p>
          <div id="go-reco" class="muted" style="margin-top:8px"></div>
          <div style="margin-top:12px">
            <div style="font-weight:600;margin-bottom:8px">Usporedba planova (procjena)</div>
            <table style="width:100%;border-collapse:collapse" aria-describedby="calc-title">
              <thead>
                <tr style="text-align:left;border-bottom:1px solid var(--color-border)">
                  <th style="padding:6px 4px">Plan</th>
                  <th style="padding:6px 4px">Pretplata (€)</th>
                  <th style="padding:6px 4px">Cijena/isporuka (€)</th>
                  <th style="padding:6px 4px">Isporuke (n)</th>
                  <th style="padding:6px 4px">Ukupno/god (€)</th>
                  <th style="padding:6px 4px">Mjesečno (€)</th>
                  <th style="padding:6px 4px">Δ vs best (€)</th>
                </tr>
              </thead>
              <tbody id="go-compare-body"></tbody>
            </table>
          </div>
        </div>
      </div>

      <script>
        (function(){
          const hr=new Intl.NumberFormat('hr-HR',{maximumFractionDigits:0});
          const events=document.getElementById('go-events');
          const eventsOut=document.getElementById('go-events-out');
          const subFee=document.getElementById('go-sub-fee');
          const perPrice=document.getElementById('go-per-price');
          const adhoc=document.getElementById('go-adhoc');
          const monthOut=document.getElementById('go-month');
          const yearOut=document.getElementById('go-year');
          const subOut=document.getElementById('go-sub');
          const varOut=document.getElementById('go-var');
          const savings=document.getElementById('go-savings');
          const subRange=document.getElementById('go-sub-range');
          const perRange=document.getElementById('go-per-range');
          const planPills=document.querySelectorAll('.go-calc__pill');
          const suggest=document.getElementById('go-suggest');
          const resetBtn=document.getElementById('go-reset');

          // Pricing logic
          // Subscription by plan; variable dio računa se marginalno po ukupnom broju isporuka
          const plans={
            mini:{sub:[600,900], label:'Mini'},
            standard:{sub:[1200,2000], label:'Standard'},
            prosireni:{sub:[2500,4000], label:'Prošireni'}
          };
          // Marginal tiers per plan
          // Mini: sve po 150
          // Standard: 1–20 @150, 21+ @100
          // Prošireni: 1–20 @150, 21–30 @100, 31+ @70
          const tierSchedules={
            mini:[ {upto:Infinity, rate:150} ],
            standard:[ {upto:20, rate:150}, {upto:Infinity, rate:100} ],
            prosireni:[ {upto:20, rate:150}, {upto:30, rate:100}, {upto:Infinity, rate:70} ]
          };
          let active='mini';

          function clamp(v,[min,max]){return Math.min(max,Math.max(min,v));}
          function tween(node,to){
            // Respect reduced motion
            const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if(reduce){ node.textContent=hr.format(to); node.dataset.val=String(to); return; }
            const from=parseInt(node.dataset.val||'0',10);
            const start=performance.now();
            const dur=420; const ease=t=>1-Math.pow(1-t,4);
            const raf=now=>{
              const p=Math.min(1,(now-start)/dur);
              const val=Math.round(from+(to-from)*ease(p));
              node.textContent=hr.format(val);
              if(p<1) requestAnimationFrame(raf); else node.dataset.val=String(to);
            };
            requestAnimationFrame(raf);
          }

          function applyRanges(){
            const p=plans[active];
            subRange.textContent=`${p.label} ${p.sub[0]}–${p.sub[1]}`;
            // update marginal info label for active plan
            const sch=tierSchedules[active];
            const parts=[]; let last=0;
            for(const t of sch){
              const from=last+1; const to=(t.upto===Infinity?'∞':t.upto);
              parts.push(`${from}${t.upto===Infinity?'':`–${to}`}: ${t.rate}`);
              last = (t.upto===Infinity? last : t.upto);
            }
            perRange.textContent=parts.join(' • ');
          }

          function marginalVariableCost(plan, n){
            if(!n) return 0;
            const sch=tierSchedules[plan];
            let remaining=n; let prev=0; let sum=0;
            for(const t of sch){
              const span=Math.min(remaining, t.upto===Infinity? remaining : (t.upto - prev));
              if(span>0){ sum += span * t.rate; remaining -= span; prev = (t.upto===Infinity? prev+span : t.upto); }
              if(remaining<=0) break;
            }
            return sum;
          }

          function marginalUnitAt(plan, n){
            if(n<=0) return 0;
            for(const t of tierSchedules[plan]){
              if(n<=t.upto) return t.rate;
            }
            const sch=tierSchedules[plan];
            return sch[sch.length-1].rate;
          }

          function pureCost(plan, n, sub){
            const s = (typeof sub==='number') ? sub : plans[plan].sub[0]; // default to min sub
            return s + marginalVariableCost(plan, n);
          }

          function costsFor(n){
            const order=['mini','standard','prosireni'];
            return order.map(p=>{
              const sub=plans[p].sub[0];
              const variable=marginalVariableCost(p, n);
              const total=sub + variable;
              return { plan:p, label:plans[p].label, sub, per:marginalUnitAt(p, Math.max(1,n)), n, total, monthly: Math.round(total/12) };
            }).sort((a,b)=>a.total-b.total);
          }

          function updateRecommendation(n){
            const list=costsFor(n);
            const best=list[0], runner=list[1];
            const diff=runner.total - best.total;
            const el=document.getElementById('go-reco');
            el.innerHTML = `Preporuka: <strong>${best.label}</strong> (ušteda ≈ <strong>${hr.format(diff)}</strong> EUR/god u odnosu na ${runner.label}).`;
          }

          function renderComparison(n){
            const tbody=document.getElementById('go-compare-body');
            const list=costsFor(n);
            const bestTotal=list[0].total;
            const rows=list.map((r,i)=>{
              const strongOpen = i===0?'<strong>':''; const strongClose = i===0?'</strong>':'';
              const delta = r.total - bestTotal;
              return `<tr style="border-bottom:1px dashed var(--color-border)">
                <td style="padding:6px 4px">${strongOpen}${r.label}${strongClose}</td>
                <td style="padding:6px 4px">${hr.format(r.sub)}</td>
                <td style="padding:6px 4px">${hr.format(r.per)}</td>
                <td style="padding:6px 4px">${hr.format(r.n)}</td>
                <td style="padding:6px 4px">${hr.format(r.total)}</td>
                <td style="padding:6px 4px">${hr.format(r.monthly)}</td>
                <td style="padding:6px 4px">${i===0? '0' : hr.format(delta)}</td>
              </tr>`;
            }).join('');
            tbody.innerHTML=rows;
          }

          function autoSelectPlanByThreshold(n){
            if(n<=20) return 'mini';
            if(n<=30) return 'standard';
            return 'prosireni';
          }

          function compute(){
            const ev=parseInt(events.value||'0',10);
            // Auto select plan by threshold (<=20 Mini, 21–30 Standard, 31+ Prošireni)
            const best=autoSelectPlanByThreshold(ev);
            if(active!==best){
              active=best;
              planPills.forEach(b=>b.setAttribute('aria-pressed',b.dataset.plan===active?'true':'false'));
              applyRanges();
            }

            const sub=clamp(parseInt(subFee.value||'0',10),plans[active].sub);
            subFee.value=sub;
            // show current marginal unit price for the nth isporuka (ovisno o planu)
            perPrice.value=marginalUnitAt(active, ev);
            eventsOut.textContent=ev;

            const variable=marginalVariableCost(active, ev);
            const annual=sub+variable;
            const monthly=Math.round(annual/12);
            tween(yearOut,annual);
            tween(monthOut,monthly);
            tween(subOut,sub);
            tween(varOut,variable);

            const ah=parseInt(adhoc.value||'0',10);
            const adhocAnnual=ev*ah;
            const diff=adhocAnnual-variable;
            const msg=diff>0?`Ušteda približno ${hr.format(diff)} EUR godišnje.`:diff<0?`Ad-hoc povoljniji za manji broj isporuka (~${hr.format(Math.abs(diff))} EUR).`:`Jednako po zadanim vrijednostima.`;
            savings.textContent=msg;
            savings.className='note '+(diff>0?'ok':diff<0?'warn':'info');

            // Update recommendation & comparison
            updateRecommendation(ev);
            renderComparison(ev);
          }

          // Bindings
          planPills.forEach(btn=>btn.addEventListener('click',()=>{
            planPills.forEach(b=>b.setAttribute('aria-pressed','false'));
            btn.setAttribute('aria-pressed','true');
            active=btn.dataset.plan;
            applyRanges();
            compute();
            if(typeof updateURL==='function') updateURL();
          }));
          function debounce(fn,ms){ let t; return (...a)=>{ clearTimeout(t); t=setTimeout(()=>fn.apply(null,a),ms); }; }
          // Deep-link support: reflect state in URL and hydrate from URL
          function getState(){
            return {
              ev: parseInt(events.value||'0',10),
              p: active,
              sub: parseInt(subFee.value||'0',10),
              ah: parseInt(adhoc.value||'0',10),
            };
          }
          function updateURL(){
            const s=getState();
            const url=new URL(location.href);
            url.searchParams.set('n', String(s.ev));
            url.searchParams.set('p', s.p);
            url.searchParams.set('sub', String(s.sub));
            url.searchParams.set('ah', String(s.ah));
            history.replaceState(null,'',url.toString());
          }
          const updateURLDebounced=debounce(updateURL,150);
          const computeDebounced=debounce(compute,80);
          events.addEventListener('input',()=>{ computeDebounced(); updateURLDebounced(); });
          [subFee,adhoc].forEach(el=>el.addEventListener('input',()=>{ compute(); updateURLDebounced(); }));

          // Suggest cheapest plan by actual total
          suggest.addEventListener('click',e=>{
            e.preventDefault();
            const ev=parseInt(events.value||'0',10);
            const best=costsFor(ev)[0];
            document.querySelector(`.go-calc__pill[data-plan="${best.plan}"]`).click();
          });

          resetBtn.addEventListener('click',()=>{
            active='mini';
            planPills.forEach(b=>b.setAttribute('aria-pressed',b.dataset.plan==='mini'?'true':'false'));
            events.value=12;
            subFee.value=900;
            perPrice.value=marginalUnitAt('mini', 12);
            adhoc.value=220;
            eventsOut.textContent='12';
            applyRanges();
            compute();
            updateURL();
          });

          // --- Lightweight tests (console only) ---
          (function tests(){
            try{
              // marginal cost math per plan
              console.assert(marginalVariableCost('mini',0)===0,'marginal 0');
              console.assert(marginalVariableCost('mini',12)===12*150,'mini 12');
              console.assert(marginalVariableCost('standard',25)===(20*150 + 5*100),'standard 25');
              console.assert(marginalVariableCost('prosireni',35)===(20*150 + 10*100 + 5*70),'prosireni 35');
              // pureCost adds subscription (min sub)
              console.assert(pureCost('mini',12,900)===900 + marginalVariableCost('mini',12),'pureCost mini');
              console.assert(pureCost('standard',25,1200)===1200 + marginalVariableCost('standard',25),'pureCost standard');
              console.assert(pureCost('prosireni',35,2500)===2500 + marginalVariableCost('prosireni',35),'pureCost prošireni');
              // clamp boundaries
              console.assert(clamp(50,[0,40])===40,'clamp high');
              console.assert(clamp(-1,[0,40])===0,'clamp low');
              // marginal unit at n per plan
              console.assert(marginalUnitAt('mini',25)===150 && marginalUnitAt('standard',25)===100 && marginalUnitAt('prosireni',35)===70,'marginal unit');
              // order sanity for n=25: Standard should be competitive/cheapest if sub not much higher
              const order25 = costsFor(25).map(x=>x.plan).join(',');
              console.assert(order25.includes('standard'),'order contains standard for 25 events');
              // Δ vs best sanity: for n=20, delta of runner equals runner.total - best.total (non-negative)
              const list20 = costsFor(20); const d20 = list20[1].total - list20[0].total; console.assert(d20>=0,'delta non-negative');
              // n=0 should pick Mini (only subscription matters)
              const order0 = costsFor(0).map(x=>x.plan).join(',');
              console.assert(order0==='mini,standard,prosireni','order for 0 events');
              // applyRanges should format label properly when switching plans
              active='standard'; applyRanges();
              console.assert(/Standard/.test(subRange.textContent),'applyRanges subRange Standard');
              active='prosireni'; applyRanges();
              console.assert(/Prošireni/.test(subRange.textContent),'applyRanges subRange Prošireni');
              // Suggest should select best plan for n=30
              events.value=30; compute(); suggest.click();
              const pressed=[...planPills].find(b=>b.getAttribute('aria-pressed')==='true').dataset.plan;
              const best30=costsFor(30)[0].plan;
              console.assert(pressed===best30,'suggest picks best plan for 30');
              // Threshold auto switching
              events.value=18; compute();
              const p18=[...planPills].find(b=>b.getAttribute('aria-pressed')==='true').dataset.plan;
              console.assert(p18==='mini','auto-switch selects mini at 18');
              events.value=25; compute();
              const p25=[...planPills].find(b=>b.getAttribute('aria-pressed')==='true').dataset.plan;
              console.assert(p25==='standard','auto-switch selects standard at 25');
              events.value=35; compute();
              const p35=[...planPills].find(b=>b.getAttribute('aria-pressed')==='true').dataset.plan;
              console.assert(p35==='prosireni','auto-switch selects prosireni at 35');
              // renderComparison should populate rows without throwing
              renderComparison(15);
              const tbody=document.getElementById('go-compare-body');
              console.assert(tbody && tbody.innerHTML.length>0,'comparison rows rendered');
              // updateRecommendation should set innerHTML
              updateRecommendation(15);
              const reco=document.getElementById('go-reco');
              console.assert(/Preporuka:/.test(reco.innerHTML),'recommendation rendered');
              console.info('✔ Kalkulator tests passed');
            }catch(e){ console.warn('Tests failed', e); }
          })();

          // Init
          // Hydrate from URL if present
          (function initFromQuery(){
            try{
              const q=new URLSearchParams(location.search);
              const p=q.get('p'); if(p && plans[p]){ active=p; planPills.forEach(b=>b.setAttribute('aria-pressed',b.dataset.plan===active?'true':'false')); }
              const n=Number(q.get('n')); if(Number.isFinite(n)){ const lo=parseInt(events.min||'0',10), hi=parseInt(events.max||'60',10); events.value=clamp(n,[lo,hi]); eventsOut.textContent=events.value; }
              const s=Number(q.get('sub')); if(Number.isFinite(s)){ subFee.value=clamp(s, plans[active].sub); }
              const ah=Number(q.get('ah')); if(Number.isFinite(ah)){ adhoc.value=ah; }
            }catch(e){ /* noop */ }
          })();
          applyRanges();
          compute();
          updateURL();
        })();
      </script>
    </section>

    <!-- ===== Sadržaj (mini TOC) + Sekcije ===== -->
    <section id="sadrzaj" class="section">
      <div class="container">
        <div class="card toc-card">
          <h2 style="margin:0 0 8px">Sadržaj</h2>
          <p class="muted" style="margin-top:0">Brza navigacija kroz cjelokupni sadržaj.</p>
          <ul id="mini-toc" style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;list-style:none;padding:0;margin:12px 0 0">
            <li><a href="#go-uvod">Uvod</a></li>
            <li><a href="#go-calculator">Kalkulator</a></li>
            <li><a href="#pretplate">Pretplatnički modeli</a></li>
            <li><a href="#go-izazovi">Kontekst & Izazovi</a></li>
            <li><a href="#go-uvidi">Uvidi iz prakse</a></li>
            <li><a href="#go-zasto_nema_lokalnog_medija">Zašto nema Lokalnog Medija?</a></li>
            <li><a href="#go-model_glas_otoka">Model "Glas Otoka"</a></li>
            <li><a href="#go-tehnicka_rjesenja">Tehnička Rješenja</a></li>
            <li><a href="#go-korcula_fragmentacija">Korčula (Fragmentacija)</a></li>
            <li><a href="#go-mljet_megafon">Mljet (Megafon)</a></li>
            <li><a href="#go-lastovo_tisina">Lastovo (Tišina)</a></li>
            <li><a href="#go-peljesac_valorizacija">Pelješac (Valorizacija)</a></li>
            <li><a href="#go-operativa">Operativa</a></li>
            <li><a href="#pravila">Pravila pretplate i cijena</a></li>
            <li><a href="#primjeri">Primjeri u praksi</a></li>
            <li><a href="#faq">Česta pitanja</a></li>
            <li><a href="#cjenik">Cjenik i Usluge</a></li>
            <li><a href="#kontakt">Kontakt</a></li>
          </ul>
        </div>

        <!-- 1: Uvod -->
        <div class="card" id="go-uvod">
          <h2>Uvod</h2>
          <p><strong>Glas Otoka</strong> nastaje iz terenske potrebe: postoji živ kulturni i društveni život, ali nedostaje trajna medijsko‑komunikacijska struktura i arhiva.</p>
          <details>
            <summary><strong>Zašto sada</strong></summary>
            <p>Rješavamo fragmentiranu vidljivost kroz kontinuiran, profesionalan i pretraživ arhiv sadržaja.</p>
          </details>
          <details>
            <summary><strong>Refleksija na eksperiment (2021–2023.)</strong></summary>
            <p>Brza isporuka i kvalitetan vizualni standard potvrdili su spremnost zajednice na ovakav servis.</p>
          </details>
        </div>

        <!-- 2: Kontekst & Izazovi -->
        <div class="card" id="go-izazovi">
          <h2>Kontekst & Izazovi</h2>
          <details open>
            <summary><strong>Izolacija i fragmentacija</strong></summary>
            <p>Bez zajedničkog kanala, informacije ne dopiru do šire zajednice i dijaspore.</p>
          </details>
          <details>
            <summary><strong>Natječajni model financiranja</strong></summa