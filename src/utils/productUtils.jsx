import products from '../data/Products';

export function obtenerProductos() {
  const productosGuardados = JSON.parse(localStorage.getItem('productos')) || [];
  const stockOriginales = JSON.parse(localStorage.getItem('stockOriginales')) || [];
  const productosEliminados = JSON.parse(localStorage.getItem('productosEliminados')) || [];
  const productosEditados = JSON.parse(localStorage.getItem('productosEditados')) || [];

  const productosOriginales = products
    .filter((product) => !productosEliminados.includes(product.id))
    .map((product) => {
      const stockGuardado = stockOriginales.find((item) => item.id === product.id);
      const productoEditado = productosEditados.find((item) => item.id === product.id);
      return {
        ...product,
        ...productoEditado,
        stock: stockGuardado?.stock ?? productoEditado?.stock ?? product.stock ?? 0
      };
    });

  return [...productosOriginales, ...productosGuardados];
}