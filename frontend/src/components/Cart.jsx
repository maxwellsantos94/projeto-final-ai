import { formatarPreco } from '../services/api';

function Cart({ itens, total, onRemover, onAlterarQuantidade, onFinalizar }) {
  return (
    <aside className="cart-panel" aria-labelledby="titulo-carrinho">
      <div className="cart-header">
        <h2 id="titulo-carrinho">🛒 Meu Carrinho</h2>
        {itens.length > 0 && (
          <span className="cart-count-badge">{itens.length}</span>
        )}
      </div>

      {itens.length === 0 ? (
        <div className="cart-empty" role="status">
          <span className="cart-empty-icon" aria-hidden="true">🛍️</span>
          <p>Seu carrinho está vazio</p>
          <span className="cart-empty-hint">Adicione produtos para continuar</span>
        </div>
      ) : (
        <>
          <ul className="cart-list" role="list">
            {itens.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-top">
                  <span className="cart-item-icon" aria-hidden="true">{item.imagemUrl || '📦'}</span>
                  <div className="cart-item-info">
                    <strong>{item.nome}</strong>
                    <span className="cart-item-price">{formatarPreco(item.preco)}</span>
                  </div>
                </div>
                <div className="cart-item-actions">
                  <label htmlFor={`qtd-${item.id}`} className="sr-only">
                    Quantidade de {item.nome}
                  </label>
                  <div className="qty-control">
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => onAlterarQuantidade(item.id, item.quantidade - 1)}
                      aria-label={`Diminuir quantidade de ${item.nome}`}
                    >
                      −
                    </button>
                    <input
                      id={`qtd-${item.id}`}
                      type="number"
                      min="1"
                      max="99"
                      value={item.quantidade}
                      onChange={(e) => onAlterarQuantidade(item.id, parseInt(e.target.value, 10) || 1)}
                      aria-label={`Quantidade de ${item.nome}`}
                    />
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => onAlterarQuantidade(item.id, item.quantidade + 1)}
                      aria-label={`Aumentar quantidade de ${item.nome}`}
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="btn-remove"
                    onClick={() => onRemover(item.id)}
                    aria-label={`Remover ${item.nome} do carrinho`}
                  >
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <div className="cart-total-row">
              <span>Total</span>
              <strong aria-live="polite">{formatarPreco(total)}</strong>
            </div>
            <button
              type="button"
              className="btn btn-checkout btn-block"
              onClick={onFinalizar}
              aria-label="Finalizar compra e ir para checkout"
            >
              FINALIZAR COMPRA
            </button>
          </div>
        </>
      )}
    </aside>
  );
}

export default Cart;
