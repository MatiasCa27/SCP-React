const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

function mapearScp(scp) {
  const numeroScp = scp.nombre.match(/scp[- ]?(\d+)/i)?.[1];

  return {
    id: scp.id,
    name: scp.nombre,
    description: scp.descripcion,
    category: scp.categoria,
    price: scp.precio,
    stock: scp.stock,
    image: numeroScp ? `/images/scp-${numeroScp}.webp` : '/images/logo.webp'
  };
}

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}/api/v1/scps${path}`, options);

  if (!response.ok) {
    const detail = await response.text();
    throw new ApiError(
      detail || `La API respondió con HTTP ${response.status}`,
      response.status
    );
  }

  if (response.status === 204) return null;

  return response.json();
}

function payloadDeProducto(product) {
  return {
    nombre: product.name.trim(),
    descripcion: product.description.trim(),
    categoria: product.category.trim(),
    precio: Number(product.price),
    stock: Number(product.stock)
  };
}

export async function obtenerProductos() {
  const scps = await request('');
  return scps.map(mapearScp);
}

export async function obtenerProducto(id) {
  const scp = await request(`/${encodeURIComponent(id)}`);
  return mapearScp(scp);
}

export async function crearProducto(product) {
  const scp = await request('', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payloadDeProducto(product))
  });
  return mapearScp(scp);
}

export async function actualizarProducto(id, product) {
  const scp = await request(`/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payloadDeProducto(product))
  });
  return mapearScp(scp);
}

export async function actualizarStock(id, cantidad) {
  const scp = await request(`/${encodeURIComponent(id)}/stock`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cantidad })
  });
  return mapearScp(scp);
}

export async function eliminarProducto(id) {
  await request(`/${encodeURIComponent(id)}`, { method: 'DELETE' });
}
