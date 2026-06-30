import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderConfirmation from './components/OrderConfirmation';
import { fetchProdutos } from './services/api';

function App() {
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [tela, setTela] = useState('loja');
  const [pedidoAtual, setPedidoAtual] = useState(null);

  useEffect(() => {
    fetchProdutos()
      .then(setProdutos)
      .catch((e) => setErro(e.message))
      .finally(() => setLoading(false));
  }, []);

  const adicionarAoCarrinho = useCallback((produto) => {
    setCarrinho((prev) => {
      const existente = prev.find((item) => item.id === produto.id);
      if (existente) {
        return prev.map((item) =>
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  }, []);

  const removerDoCarrinho = useCallback((produtoId) => {
    setCarrinho((prev) => prev.filter((item) => item.id !== produtoId));
  }, []);

  const alterarQuantidade = useCallback((produtoId, quantidade) => {
    if (quantidade <= 0) {
      setCarrinho((prev) => prev.filter((item) => item.id !== produtoId));
      return;
    }
    setCarrinho((prev) =>
      prev.map((item) => (item.id === produtoId ? { ...item, quantidade } : item))
    );
  }, []);

  const totalCarrinho = carrinho.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  const handlePedidoCriado = (pedido) => {
    setPedidoAtual(pedido);
    setCarrinho([]);
    setTela('confirmacao');
  };

  const voltarParaLoja = () => {
    setTela('loja');
    setPedidoAtual(null);
  };

  return (
    <>
      <a href="#conteudo-principal" className="skip-link">
        Pular para o conteúdo principal
      </a>

      <Header
        totalItens={carrinho.reduce((acc, item) => acc + item.quantidade, 0)}
        onIrParaCheckout={() => setTela('checkout')}
        onIrParaLoja={() => setTela('loja')}
      />

      <main id="conteudo-principal" role="main" tabIndex={-1}>
        {erro && (
          <div role="alert" className="alert alert-error" aria-live="assertive">
            {erro}
          </div>
        )}

        {loading && (
          <p className="loading" aria-live="polite">
            Carregando produtos...
          </p>
        )}

        {!loading && tela === 'loja' && (
          <div className="layout-loja">
            <ProductList produtos={produtos} onAdicionar={adicionarAoCarrinho} />
            <Cart
              itens={carrinho}
              total={totalCarrinho}
              onRemover={removerDoCarrinho}
              onAlterarQuantidade={alterarQuantidade}
              onFinalizar={() => setTela('checkout')}
            />
          </div>
        )}

        {tela === 'checkout' && (
          <Checkout
            itens={carrinho}
            total={totalCarrinho}
            onVoltar={() => setTela('loja')}
            onPedidoCriado={handlePedidoCriado}
          />
        )}

        {tela === 'confirmacao' && pedidoAtual && (
          <OrderConfirmation pedido={pedidoAtual} onVoltar={voltarParaLoja} />
        )}
      </main>

      <footer className="footer" role="contentinfo">
        <p>TechStore © 2026 — Loja de produtos eletrônicos</p>
      </footer>
    </>
  );
}

export default App;
