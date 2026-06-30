const API_BASE = import.meta.env.VITE_API_URL || '/api';

export async function fetchProdutos() {
  const response = await fetch(`${API_BASE}/produtos`);
  if (!response.ok) throw new Error('Erro ao carregar produtos');
  return response.json();
}

export async function criarPedido(pedido) {
  const response = await fetch(`${API_BASE}/pedidos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pedido),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.erro || 'Erro ao criar pedido');
  }
  return response.json();
}

export async function buscarPedido(id) {
  const response = await fetch(`${API_BASE}/pedidos/${id}`);
  if (!response.ok) throw new Error('Erro ao buscar pedido');
  return response.json();
}

export function formatarPreco(valor) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
}
