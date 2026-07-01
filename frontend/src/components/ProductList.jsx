import { formatarPreco } from '../services/api';

function ProductList({
  produtos,
  titulo = 'Produtos em destaque',
  subtitulo = 'Os melhores eletrônicos com recomendações personalizadas por IA',
  categoriaAtiva,
  busca,
  ocultarCabecalho = false,
  onAdicionar,
  onLimparFiltro,
}) {
  if (produtos.length === 0) {
    return (
      <section className="empty-state" aria-live="polite">
        <p>Nenhum produto encontrado.</p>
        {onLimparFiltro && (
          <button type="button" className="btn btn-secondary" onClick={onLimparFiltro}>
            Limpar filtros
          </button>
        )}
      </section>
    );
  }

  return (
    <section aria-labelledby={ocultarCabecalho ? undefined : 'titulo-produtos'} className="products-section">
      {!ocultarCabecalho && (
        <div className="section-header">
          <div>
            <h1 id="titulo-produtos">
              {categoriaAtiva || titulo}
            </h1>
            <p className="section-subtitle">
              {categoriaAtiva
                ? `Confira nossa seleção de ${categoriaAtiva.toLowerCase()}`
                : subtitulo}
            </p>
          </div>
          {onLimparFiltro && (
            <button type="button" className="btn btn-outline btn-sm" onClick={onLimparFiltro}>
              Limpar busca
            </button>
          )}
        </div>
      )}

      {!ocultarCabecalho && (
        <p className="results-count" aria-live="polite">
          {produtos.length} produto{produtos.length !== 1 ? 's' : ''} encontrado{produtos.length !== 1 ? 's' : ''}
          {busca ? ` para "${busca}"` : ''}
        </p>
      )}

      <ul className="product-grid" role="list">
        {produtos.map((produto) => (
          <li key={produto.id}>
            <article className="product-card" aria-labelledby={`produto-${produto.id}`}>
              <div className="product-image-wrap">
                <span className="product-icon" aria-hidden="true">
                  {produto.imagemUrl || '📦'}
                </span>
                <span className="product-category-tag">{produto.categoria}</span>
              </div>
              <div className="product-body">
                <h2 id={`produto-${produto.id}`}>{produto.nome}</h2>
                <p className="product-desc">{produto.descricao}</p>
                <div className="product-footer">
                  <p className="product-price">
                    <span className="price-label">Por</span>
                    <span className="price-value">{formatarPreco(produto.preco)}</span>
                  </p>
                  <button
                    type="button"
                    className="btn btn-buy"
                    onClick={() => onAdicionar(produto)}
                    aria-label={`Adicionar ${produto.nome} ao carrinho`}
                  >
                    COMPRAR
                  </button>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ProductList;
