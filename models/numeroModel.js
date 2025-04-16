import pool from "../config/db.js";

export async function obtenerNumeros() {
  const [rows] = await pool.query("SELECT * FROM numeros");
  return rows;
}

export async function actualizarNumeroCompleto(id, comprador, estadoVenta, fechaCompra, pagoConfirmado, compradorId) {
  const query = `
    UPDATE numeros
    SET comprador = ?, estado_venta = ?, fecha_compra = ?, pago_confirmado = ?, comprador_id = ?
    WHERE id = ?
  `;
  await pool.query(query, [comprador, estadoVenta, fechaCompra, pagoConfirmado, compradorId, id]);
}

export async function obtenerNumerosPorUsuario(userId) {
  const [rows] = await pool.query("SELECT * FROM numeros WHERE comprador_id = ?", [userId]);
  return rows;
}
