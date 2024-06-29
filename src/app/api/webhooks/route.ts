import { savePayment } from '@/lib/server/appwrite';
import { NextResponse, NextRequest } from 'next/server';
import { buffer } from 'stream/consumers';
import nodemailer from 'nodemailer';
import { render } from "@react-email/render";


import Stripe from 'stripe';
import { CustomerEmailSuccess } from '@/components/customer-email-success';
import InviteUserEmail from '@/app/emailTemplates/InviteUserEmail';
import AdminNotificationEmail from '@/app/emailTemplates/AdminNotificationEmail';
const stripe = require('stripe')(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NEXT_PUBLIC_EMAIL, // Your email address
      pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD, // Your email password or app password
    },
  });
  
  // Function to send an email

  async function sendEmail(to: string, subject: string, html: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    };
  
    await transporter.sendMail(mailOptions);
  }

  
export async function POST(req: NextRequest): Promise<NextResponse> {

  if (req.method !== 'POST') {
    return new NextResponse('Method Not Allowed', { status: 405 });
  }

  const webhookSecret = process.env.NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('Webhook secret is not defined');
    return new NextResponse('Webhook secret is not defined', { status: 500 });
  }

  let event: Stripe.Event;
  let successResponse = {};

  try {
    // Read the raw request body
    const buf = await buffer(req.body as any);
    const sig = req.headers.get('stripe-signature');

    if (!sig) {
      throw new Error('Missing stripe-signature header');
    }

    // Construct the event
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err: any) {
    console.error('Error constructing event:', err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // Handle the event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const userId = session.metadata?.userId;
    const courseId = parseInt(session.metadata?.courseId ?? "0") || 0;
    const productTitle = session.metadata?.productTitle;
    const productImageUrl = session.metadata?.productImageUrl;
    const amount = session?.amount_total !== null ? parseFloat(session.amount_total.toString()) / 100 : 0;

     const purchaseDate = new Date( session.created * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    

    if (!userId || !courseId) {
      console.error('Missing userId or courseId in session metadata');
      return new NextResponse('Missing userId or courseId in session metadata', { status: 400 });
    }

    try {
      // Assuming you have a function `savePayment` to handle saving the payment details

       await savePayment({
        userId,
        stripeSessionId: session.id,
        amount: session.amount_total,
        status: session.payment_status,
        courseId
      });
      const emailHtml = render(InviteUserEmail({
        price: amount ,
        productTitle,
        productImageUrl,
        purchaseDate
      }))
      await sendEmail(
        session?.customer_details?.email!,
        'Payment Successful',
        emailHtml
      );

      const adminEmailHtml = render(
        AdminNotificationEmail({
          userName: session?.customer_details?.name ?? 'Unknown User',
          userEmail: session?.customer_details?.email ?? 'example@example.com',
          productTitle,
          productImageUrl,
          purchaseDate,
          price:amount
        })
      );
      
      await sendEmail(
        process.env.NEXT_PUBLIC_EMAIL!,
        'New Course Purchased',
        adminEmailHtml
      );


    } catch (error: any) {
      console.error('Error saving payment:', error.message);
      return new NextResponse(`Error saving payment: ${error.message}`, { status: 500 });
    }
  }

  return new NextResponse('Success', { status: 200 });
}
