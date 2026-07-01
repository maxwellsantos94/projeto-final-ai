import { useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import ProductList from '../components/ProductList';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';
import { slugParaCategoria, getCategoriaInfo } from '../utils/categories';

function CategoryPage() {
  const { slug } = useParams();
  const { produtos, categorias, loading, erro } = useProducts();
  const { adicionarAoCarrinho } = useCart();

  const categoria = slugParaCategoria(slug, categorias);
  const info = categoria ? getCategoriaInfo(categoria) : null;

  const produtosCategoria = useMemo(
    () => (categoria ? produtos.filter((p) => p.categoria === categoria) : []),
    [produtos, categoria]
  );

  if (loading) {
    return (
      <div className="loading-screen" aria-live="polite">
        <div className="spinner" aria-hidden="true" />
        <p>Carregando produtos...</p>
      </div>
    );
  }

  if (erro) {
    return <div role="alert" className="alert alert-error">{erro}</div>;
  }

  if (!categoria) {
    return <Navigate to="/categorias" replace />;
  }

  return (
    <>
      <nav className="breadcrumb" aria-label="Navegação">
        <Link to="/">Início</Link>
        <span aria-hidden="true">/</span>
        <Link to="/categorias">Categorias</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{categoria}</span>
      </nav>

      <div className="category-page-header">
        <span className="category-page-icon" aria-hidden="true">{info.icon}</span>
        <div>
          <h1>{categoria}</h1>
          <p className="section-subtitle">{info.descricao}</p>
        </div>
      </div>

      <ProductList
        produtos={produtosCategoria}
        titulo=""
        subtitulo=""
        ocultarCabecalho
        onAdicionar={adicionarAoCarrinho}
      />
    </>
  );
}

export default CategoryPage;
