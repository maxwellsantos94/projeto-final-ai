import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { fetchProdutos } from '../services/api';

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    fetchProdutos()
      .then(setProdutos)
      .catch((e) => setErro(e.message))
      .finally(() => setLoading(false));
  }, []);

  const categorias = useMemo(
    () => [...new Set(produtos.map((p) => p.categoria))].sort(),
    [produtos]
  );

  const value = useMemo(
    () => ({ produtos, categorias, loading, erro }),
    [produtos, categorias, loading, erro]
  );

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProducts deve ser usado dentro de ProductsProvider');
  return ctx;
}
