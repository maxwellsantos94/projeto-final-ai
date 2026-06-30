import { useState } from 'react';
import { criarPedido, formatarPreco } from '../services/api';

function Checkout({ itens, total, onVoltar, onPedidoCriado }) {
  const [cliente, setCliente] = useState('');
  const [cidade, setCidade] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(null);
    setEnviando(true);

    const pedido = {
      cliente: cliente.trim(),
      cidade: cidade.trim(),
      valorTotal: total,
      produtos: itens.flatMap((item) =>
        Array(item.quantidade).fill(item.nome)
      ),
    };

    try {
      const resultado = await criarPedido(pedido);
      onPedidoCriado(resultado);
    } catch (err) {
      setErro(err.message);
    } finally {
      setEnviando(false);
    }
  };

  if (itens.length === 0) {
    return (
      <section className="checkout" aria-labelledby="titulo-checkout">
        <h1 id="titulo-checkout">Checkout</h1>
        <p role="alert">Seu carrinho está vazio. Adicione produtos antes de finalizar.</p>
        <button type="button" className="btn btn-secondary" onClick={onVoltar}>
          Voltar para a loja
        </button>
      </section>
    );
  }

  return (
    <section className="checkout" aria-labelledby="titulo-checkout">
      <h1 id="titulo-checkout">Finalizar Pedido</h1>

      <div className="checkout-resumo" aria-labelledby="resumo-pedido">
        <h2 id="resumo-pedido">Resumo do pedido</h2>
        <ul role="list">
          {itens.map((item) => (
            <li key={item.id}>
              {item.quantidade}x {item.nome} — {formatarPreco(item.preco * item.quantidade)}
            </li>
          ))}
        </ul>
        <p><strong>Total: {formatarPreco(total)}</strong></p>
      </div>

      <form onSubmit={handleSubmit} noValidate aria-describedby={erro ? 'erro-checkout' : undefined}>
        <fieldset>
          <legend>Dados do cliente</legend>

          <div className="form-group">
            <label htmlFor="cliente">Nome completo *</label>
            <input
              id="cliente"
              type="text"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
              required
              autoComplete="name"
              aria-required="true"
            />
          </div>

          <div className="form-group">
            <label htmlFor="cidade">Cidade *</label>
            <input
              id="cidade"
              type="text"
              value={cidade}
              onChange={(e) => setCidade(e.target.value)}
              required
              autoComplete="address-level2"
              aria-required="true"
            />
          </div>
        </fieldset>

        {erro && (
          <div id="erro-checkout" role="alert" className="alert alert-error">
            {erro}
          </div>
        )}

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onVoltar} disabled={enviando}>
            Voltar
          </button>
          <button type="submit" className="btn btn-primary" disabled={enviando} aria-busy={enviando}>
            {enviando ? 'Enviando pedido...' : 'Confirmar pedido'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default Checkout;
