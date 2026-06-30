import { formatarPreco } from '../services/api';

function ProductList({ produtos, onAdicionar }) {
  if (produtos.length === 0) {
    return <p>Nenhum produto disponível no momento.</p>;
  }

  return (
    <section aria-labelledby="titulo-produtos">
      <h1 id="titulo-produtos">Produtos Eletrônicos</h1>
      <p className="subtitle">
        Encontre notebooks, periféricos e acessórios com recomendações personalizadas por IA.
      </p>

      <ul className="product-grid" role="list">
        {produtos.map((produto) => (
          <li key={produto.id}>
            <article className="product-card" aria-labelledby={`produto-${produto.id}`}>
              <div className="product-icon" aria-hidden="true">
                {produto.imagemUrl || '📦'}
              </div>
              <span className="product-category">{produto.categoria}</span>
              <h2 id={`produto-${produto.id}`}>{produto.nome}</h2>
              <p className="product-desc">{produto.descricao}</p>
              <p className="product-price">
                <span className="sr-only">Preço: </span>
                {formatarPreco(produto.preco)}
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onAdicionar(produto)}
                aria-label={`Adicionar ${produto.nome} ao carrinho`}
              >
                Adicionar ao carrinho
              </button>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ProductList;
