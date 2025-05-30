import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

export async function registerUser(req, res) {
  const { nombre, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)",
      [nombre, email, hashedPassword]
    );
    res.json({ message: "Usuario registrado correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error en registro: " + err.message });
  }
}

export async function loginUser(req, res) {
  const { email, password } = req.body;
  try {
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [email]);
    const user = rows[0];
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Error en login: " + err.message });
  }
}
console.log("🧪 JWT_SECRET en login:", process.env.JWT_SECRET);

export async function resetPassword(req, res) {
  const { email, newPassword } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const [result] = await pool.query("UPDATE usuarios SET password = ? WHERE email = ?", [hashedPassword, email]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Correo no encontrado" });
    }

    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar contraseña" });
  }
}
