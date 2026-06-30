function Header({ totalItens, onIrParaCheckout, onIrParaLoja }) {
  return (
    <header className="header" role="banner">
      <div className="header-content">
        <button
          type="button"
          className="logo-btn"
          onClick={onIrParaLoja}
          aria-label="TechStore - Voltar para a loja"
        >
          <span aria-hidden="true">⚡</span>
          <span>TechStore</span>
        </button>

        <nav aria-label="Navegação principal">
          <ul className="nav-list">
            <li>
              <button type="button" onClick={onIrParaLoja}>
                Produtos
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={onIrParaCheckout}
                aria-label={`Carrinho com ${totalItens} itens`}
              >
                🛒 Carrinho ({totalItens})
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
