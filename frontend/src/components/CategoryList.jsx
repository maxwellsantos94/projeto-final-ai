import { Link } from 'react-router-dom';
import { getCategoriaInfo, categoriaParaSlug } from '../utils/categories';

function CategoryList({ categorias, produtos }) {
  const contagemPorCategoria = categorias.reduce((acc, cat) => {
    acc[cat] = produtos.filter((p) => p.categoria === cat).length;
    return acc;
  }, {});

  return (
    <section aria-labelledby="titulo-categorias" className="categories-section">
      <div className="section-header">
        <h1 id="titulo-categorias">Categorias</h1>
        <p className="section-subtitle">
          Navegue por departamento e encontre o equipamento ideal para seu setup.
        </p>
      </div>

      <ul className="category-grid" role="list">
        {categorias.map((categoria) => {
          const info = getCategoriaInfo(categoria);
          const qtd = contagemPorCategoria[categoria] || 0;
          const slug = categoriaParaSlug(categoria);

          return (
            <li key={categoria}>
              <Link
                to={`/categorias/${slug}`}
                className="category-card"
                aria-label={`Ver produtos da categoria ${categoria}, ${qtd} itens`}
              >
                <span className="category-icon" aria-hidden="true">{info.icon}</span>
                <span className="category-name">{categoria}</span>
                <span className="category-desc">{info.descricao}</span>
                <span className="category-count">{qtd} produto{qtd !== 1 ? 's' : ''}</span>
                <span className="category-arrow" aria-hidden="true">→</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default CategoryList;
