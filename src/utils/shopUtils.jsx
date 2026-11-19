const CARRITO_KEY = 'carrito';
const FAVORITOS_KEY = 'favoritos';

export function obtenerCarrito() {
  return JSON.parse(localStorage.getItem(CARRITO_KEY)) || [];
}

export function guardarCarrito(items) {
  localStorage.setItem(CARRITO_KEY, JSON.stringify(items));
}

export function carritoEstaVacio(items) {
  return !Array.isArray(items) || items.length === 0;
}

export function obtenerFavoritos() {
  return JSON.parse(localStorage.getItem(FAVORITOS_KEY)) || [];
}

export function guardarFavoritos(items) {
  localStorage.setItem(FAVORITOS_KEY, JSON.stringify(items));
}

export function favoritosEstaVacio(items) {
  return !Array.isArray(items) || items.length === 0;
}