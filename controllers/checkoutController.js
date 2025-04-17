import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function crearCheckout(req, res) {
  const { numeros, precioUnitario } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Números de Rifa",
            },
            unit_amount: precioUnitario * 100, 
          },
          quantity: numeros.length,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/success",
      cancel_url: "http://localhost:5173/cancel",
    });
    

    res.json({ url: session.url });
  } catch (err) {
    console.error("❌ Error al crear checkout:", err.message);
    res.status(500).json({ error: "Error al iniciar el pago" });
  }
}
