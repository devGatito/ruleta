import express from "express";
import { getNumeros, updateNumero, getMisNumeros } from "../controllers/numeroController.js";
import { registerUser, loginUser } from "../controllers/authController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

// Rutas públicas
router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);

// Rutas protegidas
router.get("/usuario/mis-numeros", verifyToken, getMisNumeros);
router.get("/numeros", getNumeros);
router.put("/numeros/:id", verifyToken, updateNumero);
export default router;
