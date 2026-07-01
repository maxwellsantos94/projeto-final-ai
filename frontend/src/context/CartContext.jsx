import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [carrinho, setCarrinho] = useState([]);

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

  const limparCarrinho = useCallback(() => setCarrinho([]), []);

  const totalItens = useMemo(
    () => carrinho.reduce((acc, item) => acc + item.quantidade, 0),
    [carrinho]
  );

  const totalCarrinho = useMemo(
    () => carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0),
    [carrinho]
  );

  const value = useMemo(
    () => ({
      carrinho,
      totalItens,
      totalCarrinho,
      adicionarAoCarrinho,
      removerDoCarrinho,
      alterarQuantidade,
      limparCarrinho,
    }),
    [carrinho, totalItens, totalCarrinho, adicionarAoCarrinho, removerDoCarrinho, alterarQuantidade, limparCarrinho]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart deve ser usado dentro de CartProvider');
  return ctx;
}
