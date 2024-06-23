import { NextResponse, NextRequest } from "next/server";
const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {

    if (req.method !== 'POST') {
       // return res.status(405).json({ message: 'Method Not Allowed' });
      }
    
      const { courseId, courseTitle, coursePrice, userId,productImageUrl,priceId } = await req.json();
      try {
        // Create a new Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [
            {
              // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
              price: priceId,
              quantity: 1,
            },
          ],
          mode: 'payment',
          success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/user/`, // Redirect URL after successful payment
          cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/user/`, // Redirect URL after canceled payment
          metadata: {
            courseId,
            userId,
            courseTitle,
            coursePrice,
            productImageUrl

          },
        });
        return NextResponse.json({
            id: session.id
          });
    
      } catch (error) {
        console.error(error);
        //res.status(500).json({ error: 'An error occurred while creating the checkout session.' });
      }
  
}
