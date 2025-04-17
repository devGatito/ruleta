import express from "express";
import {
  getNumeros,
  updateNumero,
  getMisNumeros,
} from "../controllers/numeroController.js";
import {
  registerUser,
  loginUser,
  resetPassword,
} from "../controllers/authController.js";
import verifyToken from "../middleware/authMiddleware.js";
import { crearCheckout } from "../controllers/checkoutController.js";
import verifyAdmin from "../middleware/adminMiddleware.js";


const router = express.Router();

// Rutas públicas
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);
router.post("/auth/reset-password", resetPassword);

//admin
router.get("/admin/dashboard", verifyToken, verifyAdmin, (req, res) => {
  res.json({ message: "Bienvenido Admin" });
});


//pagos
router.post("/checkout", verifyToken, crearCheckout);

router.get("/auth/me", verifyToken, (req, res) => {
  const user = req.user;
  res.json({
    id: user.id,
    name: user.name,
    email: user.email,
  });
});

// Rutas protegidas
router.get("/usuario/mis-numeros", verifyToken, getMisNumeros);
router.get("/numeros", getNumeros);
router.put("/numeros/:id", verifyToken, updateNumero);
export default router;
