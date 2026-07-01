import { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import { useProducts } from '../context/ProductsContext';
import { useCart } from '../context/CartContext';

function ProductsPage() {
  const { produtos, loading, erro } = useProducts();
  const { adicionarAoCarrinho } = useCart();
  const [searchParams, setSearchParams] = useSearchParams();
  const busca = searchParams.get('busca') ?? '';

  const produtosFiltrados = useMemo(() => {
    if (!busca.trim()) return produtos;
    const termo = busca.toLowerCase();
    return produtos.filter(
      (p) =>
        p.nome.toLowerCase().includes(termo) ||
        p.categoria.toLowerCase().includes(termo) ||
        p.descricao.toLowerCase().includes(termo)
    );
  }, [produtos, busca]);

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

  return (
    <>
      <nav className="breadcrumb" aria-label="Navegação">
        <Link to="/">Início</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Produtos</span>
      </nav>

      <ProductList
        produtos={produtosFiltrados}
        titulo="Todos os produtos"
        subtitulo={`Catálogo completo com ${produtos.length} produtos eletrônicos`}
        busca={busca}
        onAdicionar={adicionarAoCarrinho}
        onLimparFiltro={busca ? () => setSearchParams({}) : undefined}
      />
    </>
  );
}

export default ProductsPage;
