import {
  obtenerNumeros,
  actualizarNumeroCompleto,
  obtenerNumerosPorUsuario
} from "../models/numeroModel.js";

export async function getNumeros(req, res) {
  try {
    const data = await obtenerNumeros();
    res.json(data);
  } catch (err) {
    console.error("❌ Error en getNumeros:", err);
    res.status(500).json({ error: "Error al obtener los números" });
  }
}

export async function updateNumero(req, res) {
  const { id } = req.params;
  const { comprador, estadoVenta, fechaCompra, pagoConfirmado } = req.body;
  const compradorId = req.user?.id || null;
  console.log("Usuario autenticado:", req.user);


  try {
    await actualizarNumeroCompleto(id, comprador, estadoVenta, fechaCompra, pagoConfirmado, compradorId);
    res.json({ message: "Número actualizado correctamente" });
  } catch (err) {
    console.error("❌ Error en updateNumero:", err);
    res.status(500).json({ error: "Error al actualizar el número", details: err.message });
  }
}

export async function getMisNumeros(req, res) {
  try {
    const userId = req.user.id;
    const data = await obtenerNumerosPorUsuario(userId);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener tus números" });
  }
}
