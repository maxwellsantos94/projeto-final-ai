import { Outlet, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Header from '../components/Header';
import Cart from '../components/Cart';
import { useCart } from '../context/CartContext';

function MainLayout() {
  const [busca, setBusca] = useState('');
  const navigate = useNavigate();
  const {
    carrinho,
    totalCarrinho,
    removerDoCarrinho,
    alterarQuantidade,
  } = useCart();

  const handleBuscaSubmit = (termo) => {
    const q = termo.trim();
    navigate(q ? `/produtos?busca=${encodeURIComponent(q)}` : '/produtos');
  };

  return (
    <>
      <a href="#conteudo-principal" className="skip-link">
        Pular para o conteúdo principal
      </a>

      <Header
        busca={busca}
        onBuscaChange={setBusca}
        onBuscaSubmit={handleBuscaSubmit}
      />

      <main id="conteudo-principal" role="main" tabIndex={-1}>
        <Outlet context={{ setBusca }} />
      </main>

      <footer className="footer" role="contentinfo">
        <div className="footer-inner">
          <div className="footer-brand">
            <strong>TechStore</strong>
            <p>Tech & Gamer com inteligência artificial</p>
          </div>
          <div className="footer-links">
            <span>Produtos</span>
            <span>Categorias</span>
            <span>Atendimento IA</span>
          </div>
          <p className="footer-copy">© 2026 TechStore — Trabalho Final IA Serratec</p>
        </div>
      </footer>
    </>
  );
}

export function ShopLayout() {
  const navigate = useNavigate();
  const { carrinho, totalCarrinho, removerDoCarrinho, alterarQuantidade } = useCart();

  return (
    <div className="page-container">
      <div className="page-content">
        <Outlet />
      </div>
      <Cart
        itens={carrinho}
        total={totalCarrinho}
        onRemover={removerDoCarrinho}
        onAlterarQuantidade={alterarQuantidade}
        onFinalizar={() => navigate('/checkout')}
      />
    </div>
  );
}

export default MainLayout;
