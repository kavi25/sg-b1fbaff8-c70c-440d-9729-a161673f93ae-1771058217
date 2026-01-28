import type { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "@/lib/stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { priceId, planName, price } = req.body;

    // Get the base URL for redirect URLs
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                    (req.headers.host?.includes("localhost") 
                      ? `http://${req.headers.host}` 
                      : `https://${req.headers.host}`);

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name: `${planName} Package`,
              description: `ITProBit ${planName} Service Package`,
            },
            unit_amount: parseInt(price.replace(/,/g, "")) * 100, // Convert to pence
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${baseUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/payment/cancel`,
      metadata: {
        planName,
        priceId,
      },
    });

    res.status(200).json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe error:", error);
    res.status(500).json({ message: error.message });
  }
}