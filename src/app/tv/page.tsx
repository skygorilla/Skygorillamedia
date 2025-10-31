import Header from '@/components/layout/header';

export default function TVHub() {
  return (
    <>
      <Header />
      <main className="tv-hub">
        {/* Hero TV Section */}
        <section className="tv-hero">
          <div className="container">
            <h1>Glas Otoka TV</h1>
            <p>Medijska platforma za sve otoke — live stream, arhiva, priče</p>
            <div className="live-indicator">
              <span className="live-dot"></span>
              UŽIVO: Gradsko vijeće Korčula
            </div>
          </div>
        </section>

        {/* Live Events */}
        <section className="section">
          <div className="container">
            <h2>Live događaji</h2>
            <div className="live-grid">
              <div className="live-card">
                <div className="live-badge">UŽIVO</div>
                <h3>Gradsko vijeće Korčula</h3>
                <p>Rasprava o turističkoj sezoni 2024</p>
              </div>
              <div className="live-card upcoming">
                <div className="upcoming-badge">USKORO</div>
                <h3>NK Korčula vs NK Dubrovnik</h3>
                <p>Danas u 18:00</p>
              </div>
            </div>
          </div>
        </section>

        {/* Dokumentarne priče */}
        <section className="section" style={{background: 'hsl(var(--muted))'}}>
          <div className="container">
            <h2>Dokumentarne priče</h2>
            <div className="stories-grid">
              <div className="story-card">
                <h3>Moreška kroz stoljeća</h3>
                <p>Tradicija koja spaja prošlost i sadašnjost</p>
                <span className="duration">12 min</span>
              </div>
              <div className="story-card">
                <h3>Ribari Mljeta</h3>
                <p>Život na najzelenjem otoku Jadrana</p>
                <span className="duration">18 min</span>
              </div>
              <div className="story-card">
                <h3>Lastovska regata</h3>
                <p>Tradicija koja okuplja zajednicu</p>
                <span className="duration">15 min</span>
              </div>
            </div>
          </div>
        </section>

        {/* Arhiva */}
        <section className="section">
          <div className="container">
            <h2>Arhiva</h2>
            <div className="archive-filters">
              <button className="filter-btn active">Sve</button>
              <button className="filter-btn">Korčula</button>
              <button className="filter-btn">Mljet</button>
              <button className="filter-btn">Lastovo</button>
              <button className="filter-btn">Pelješac</button>
            </div>
            <div className="archive-grid">
              <div className="archive-item">
                <h4>Kulturno ljeto 2023</h4>
                <p>Pregled svih događanja</p>
                <span className="date">Kolovoz 2023</span>
              </div>
              <div className="archive-item">
                <h4>Vinska berba Pelješac</h4>
                <p>Tradicija koja traje</p>
                <span className="date">Rujan 2023</span>
              </div>
            </div>
          </div>
        </section>

        {/* Podcasti */}
        <section className="section" style={{background: 'hsl(var(--muted))'}}>
          <div className="container">
            <h2>Podcasti & Intervjui</h2>
            <div className="podcast-grid">
              <div className="podcast-card">
                <h3>Razgovor s gradonačelnikom</h3>
                <p>Planovi za 2024. godinu</p>
                <span className="duration">45 min</span>
              </div>
              <div className="podcast-card">
                <h3>Mladi i budućnost otoka</h3>
                <p>Što ih drži, što ih tjera</p>
                <span className="duration">32 min</span>
              </div>
            </div>
          </div>
        </section>

        {/* Sportski kutak */}
        <section className="section">
          <div className="container">
            <h2>Sportski kutak</h2>
            <div className="sports-grid">
              <div className="sport-card">
                <h3>Nogomet</h3>
                <p>NK Korčula - rezultati i najave</p>
              </div>
              <div className="sport-card">
                <h3>Jedriličarstvo</h3>
                <p>Regata oko otoka</p>
              </div>
              <div className="sport-card">
                <h3>Vaterpolo</h3>
                <p>VK Korčula - nova sezona</p>
              </div>
            </div>
          </div>
        </section>

        {/* Uskoro */}
        <section className="section" style={{background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))'}}>
          <div className="container">
            <div className="coming-soon">
              <h2 style={{color: 'hsl(var(--primary-foreground))'}}>Uskoro</h2>
              <p>Interaktivna karta lokalnih priča</p>
              <p>Digitalne vremenske kapsule</p>
              <p>Mobilna aplikacija</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

    