import { Link } from 'react-router-dom';

function HeroBanner() {
  return (
    <section className="hero-banner" aria-label="Destaques da loja">
      <div className="hero-content">
        <span className="hero-badge">Julho Tech</span>
        <h1 className="hero-title">
          Ofertas em <span>Tech & Gamer</span>
        </h1>
        <p className="hero-subtitle">
          Notebooks, periféricos e acessórios com análise inteligente do seu perfil de compra.
        </p>
        <Link to="/produtos" className="btn btn-hero">
          Ver produtos
        </Link>
      </div>
      <div className="hero-visual" aria-hidden="true">
        <div className="hero-card hero-card-1">🎮</div>
        <div className="hero-card hero-card-2">💻</div>
        <div className="hero-card hero-card-3">🎧</div>
      </div>
    </section>
  );
}

export default HeroBanner;
