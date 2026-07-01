import { Link } from 'react-router-dom';
import CategoryList from '../components/CategoryList';
import { useProducts } from '../context/ProductsContext';

function CategoriesPage() {
  const { produtos, categorias, loading, erro } = useProducts();

  if (loading) {
    return (
      <div className="loading-screen" aria-live="polite">
        <div className="spinner" aria-hidden="true" />
        <p>Carregando categorias...</p>
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
        <span aria-current="page">Categorias</span>
      </nav>

      <CategoryList categorias={categorias} produtos={produtos} />
    </>
  );
}

export default CategoriesPage;
