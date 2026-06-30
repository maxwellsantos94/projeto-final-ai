import { formatarPreco } from '../services/api';

function Cart({ itens, total, onRemover, onAlterarQuantidade, onFinalizar }) {
  return (
    <aside className="cart-panel" aria-labelledby="titulo-carrinho">
      <h2 id="titulo-carrinho">Carrinho</h2>

      {itens.length === 0 ? (
        <p role="status">Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul className="cart-list" role="list">
            {itens.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <strong>{item.nome}</strong>
                  <span>{formatarPreco(item.preco)}</span>
                </div>
                <div className="cart-item-actions">
                  <label htmlFor={`qtd-${item.id}`} className="sr-only">
                    Quantidade de {item.nome}
                  </label>
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
                    className="btn btn-danger btn-sm"
                    onClick={() => onRemover(item.id)}
                    aria-label={`Remover ${item.nome} do carrinho`}
                  >
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <p className="cart-total">
            <strong>Total: </strong>
            <span aria-live="polite">{formatarPreco(total)}</span>
          </p>

          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={onFinalizar}
            aria-label="Finalizar compra e ir para checkout"
          >
            Finalizar compra
          </button>
        </>
      )}
    </aside>
  );
}

export default Cart;
