import { Link, useNavigate } from 'react-router-dom';
import HeroBanner from '../components/HeroBanner';
import ProductList from '../components/ProductList';
import Cart from '../components/Cart';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';

function HomePage() {
  const { produtos, loading, erro } = useProducts();
  const {
    adicionarAoCarrinho,
    carrinho,
    totalCarrinho,
    removerDoCarrinho,
    alterarQuantidade,
  } = useCart();
  const navigate = useNavigate();

  const destaques = produtos.slice(0, 4);

  if (loading) {
    return (
      <div className="loading-screen" aria-live="polite">
        <div className="spinner" aria-hidden="true" />
        <p>Carregando produtos...</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div role="alert" className="alert alert-error container">
        {erro}
      </div>
    );
  }

  return (
    <>
      <HeroBanner />

      <div className="page-container">
        <div className="page-content">
          <section className="home-highlights" aria-labelledby="titulo-destaques">
            <div className="section-header">
              <div>
                <h2 id="titulo-destaques">Destaques da semana</h2>
                <p className="section-subtitle">Confira as ofertas mais buscadas da TechStore</p>
              </div>
              <Link to="/produtos" className="btn btn-outline btn-sm">
                Ver todos os produtos →
              </Link>
            </div>
            <ProductList
              produtos={destaques}
              ocultarCabecalho
              onAdicionar={adicionarAoCarrinho}
            />
          </section>
        </div>

        <Cart
          itens={carrinho}
          total={totalCarrinho}
          onRemover={removerDoCarrinho}
          onAlterarQuantidade={alterarQuantidade}
          onFinalizar={() => navigate('/checkout')}
        />
      </div>
    </>
  );
}

export default HomePage;
