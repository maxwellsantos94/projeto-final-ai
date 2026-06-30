import { useState, useEffect, useRef } from 'react';
import { buscarPedido, formatarPreco } from '../services/api';

function OrderConfirmation({ pedido: pedidoInicial, onVoltar }) {
  const [pedido, setPedido] = useState(pedidoInicial);
  const [aguardandoIA, setAguardandoIA] = useState(pedidoInicial.status === 'PENDENTE');
  const tituloRef = useRef(null);

  useEffect(() => {
    tituloRef.current?.focus();
  }, []);

  useEffect(() => {
    if (pedido.status !== 'PENDENTE') {
      setAguardandoIA(false);
      return;
    }

    const interval = setInterval(async () => {
      try {
        const atualizado = await buscarPedido(pedido.id);
        setPedido(atualizado);
        if (atualizado.status === 'ANALISADO') {
          setAguardandoIA(false);
        }
      } catch {
        /* continua tentando */
      }
    }, 3000);

    const timeout = setTimeout(() => setAguardandoIA(false), 60000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [pedido.id, pedido.status]);

  return (
    <section className="confirmation" aria-labelledby="titulo-confirmacao">
      <h1 id="titulo-confirmacao" ref={tituloRef} tabIndex={-1}>
        Pedido #{pedido.id} confirmado!
      </h1>

      <div className="confirmation-card">
        <h2>Detalhes do pedido</h2>
        <dl className="detail-list">
          <dt>Cliente</dt>
          <dd>{pedido.cliente}</dd>
          <dt>Cidade</dt>
          <dd>{pedido.cidade}</dd>
          <dt>Valor total</dt>
          <dd>{formatarPreco(pedido.valorTotal)}</dd>
          <dt>Produtos</dt>
          <dd>{pedido.produtos.join(', ')}</dd>
          <dt>Status</dt>
          <dd>
            <span className={`status-badge status-${pedido.status.toLowerCase()}`}>
              {pedido.status === 'PENDENTE' ? 'Aguardando análise IA' : 'Analisado pela IA'}
            </span>
          </dd>
        </dl>
      </div>

      {aguardandoIA && (
        <div className="ia-loading" role="status" aria-live="polite">
          <div className="spinner" aria-hidden="true" />
          <p>Aguardando análise da Inteligência Artificial...</p>
          <p className="hint">O n8n está processando seu pedido com o Gemini.</p>
        </div>
      )}

      {pedido.status === 'ANALISADO' && (
        <div className="ia-result" role="region" aria-labelledby="titulo-ia">
          <h2 id="titulo-ia">Análise personalizada pela IA</h2>

          <article className="ia-card">
            <h3>Perfil do cliente</h3>
            <p className="ia-highlight">{pedido.perfilCliente}</p>
          </article>

          <article className="ia-card">
            <h3>Produtos recomendados</h3>
            <p>{pedido.recomendacoes}</p>
          </article>

          {pedido.cupomDesconto && (
            <article className="ia-card cupom">
              <h3>Cupom de desconto</h3>
              <p className="cupom-code" aria-label={`Cupom: ${pedido.cupomDesconto}`}>
                {pedido.cupomDesconto}
              </p>
            </article>
          )}

          <article className="ia-card mensagem">
            <h3>Mensagem personalizada</h3>
            <blockquote cite="#">{pedido.mensagemIA}</blockquote>
          </article>
        </div>
      )}

      {!aguardandoIA && pedido.status === 'PENDENTE' && (
        <div className="alert alert-warning" role="alert">
          A análise IA ainda não foi recebida. Verifique se o n8n está configurado e em execução.
          Você pode recarregar a página para tentar novamente.
        </div>
      )}

      <button type="button" className="btn btn-primary" onClick={onVoltar}>
        Continuar comprando
      </button>
    </section>
  );
}

export default OrderConfirmation;
