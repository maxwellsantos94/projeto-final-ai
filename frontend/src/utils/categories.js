export const CATEGORIA_INFO = {
  Notebooks: { icon: '💻', descricao: 'Notebooks gamer e profissionais' },
  Periféricos: { icon: '🖱️', descricao: 'Mouse, teclado, webcam e mais' },
  Áudio: { icon: '🎧', descricao: 'Headsets e equipamentos de som' },
  Armazenamento: { icon: '💾', descricao: 'SSDs e soluções de storage' },
  Monitores: { icon: '🖥️', descricao: 'Monitores gamer e profissionais' },
  Acessórios: { icon: '🎒', descricao: 'Mochilas, cabos e suportes' },
};

export function categoriaParaSlug(categoria) {
  return categoria
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '-');
}

export function slugParaCategoria(slug, categorias) {
  return categorias.find((c) => categoriaParaSlug(c) === slug) ?? null;
}

export function getCategoriaInfo(categoria) {
  return CATEGORIA_INFO[categoria] ?? { icon: '📦', descricao: 'Produtos diversos' };
}
