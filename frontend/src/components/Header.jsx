import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Header({ busca, onBuscaChange, onBuscaSubmit }) {
  const { totalItens } = useCart();
  const navigate = useNavigate();

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onBuscaSubmit?.(busca);
    }
  };

  return (
    <header className="header" role="banner">
      <div className="header-top">
        <div className="header-container">
          <Link to="/" className="logo-btn" aria-label="TechStore - Ir para início">
            <span className="logo-icon" aria-hidden="true">⚡</span>
            <span className="logo-text">
              Tech<span className="logo-highlight">Store</span>
            </span>
          </Link>

          <div className="search-bar" role="search">
            <label htmlFor="busca-produtos" className="sr-only">
              Buscar produtos
            </label>
            <input
              id="busca-produtos"
              type="search"
              placeholder="Buscar produtos, marcas e categorias..."
              value={busca}
              onChange={(e) => onBuscaChange(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
            <button
              type="button"
              className="search-btn"
              aria-label="Buscar"
              onClick={() => onBuscaSubmit?.(busca)}
            >
              <span aria-hidden="true">🔍</span>
            </button>
          </div>

          <button
            type="button"
            className="cart-header-btn"
            onClick={() => navigate('/checkout')}
            aria-label={`Carrinho com ${totalItens} itens`}
          >
            <span className="cart-icon" aria-hidden="true">🛒</span>
            <span className="cart-label">Carrinho</span>
            {totalItens > 0 && (
              <span className="cart-badge" aria-hidden="true">{totalItens}</span>
            )}
          </button>
        </div>
      </div>

      <nav className="header-nav" aria-label="Navegação principal">
        <div className="header-container nav-inner">
          <ul className="nav-tabs">
            <li>
              <NavLink
                to="/"
                end
                className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}
              >
                Início
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/produtos"
                className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}
              >
                Produtos
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/categorias"
                className={({ isActive }) => `nav-tab ${isActive ? 'active' : ''}`}
              >
                Categorias
              </NavLink>
            </li>
          </ul>

          <div className="nav-promo" aria-hidden="true">
            <span className="promo-tag">IA</span>
            Recomendações personalizadas em cada compra
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
