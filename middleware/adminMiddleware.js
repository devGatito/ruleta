export default function verifyAdmin(req, res, next) {
    if (req.user.email !== "admin@tudominio.com") {
      return res.status(403).json({ error: "Acceso denegado" });
    }
    next();
  }
  