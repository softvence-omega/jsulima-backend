// stripe.controller.ts

import { Controller, Post, Headers, Req, Res } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { Request, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import Stripe from 'stripe';
import { PaymentStatus } from '@prisma/client';

@Controller('webhook/stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly prisma: PrismaService,
  ) {}

  @Post()
  async handleWebhook(
    @Req() request: Request,
    @Res() response: Response,
    @Headers('stripe-signature') signature: string,
  ) {
    let event: Stripe.Event;

    try {
      event = await this.stripeService.constructWebhookEvent(request.body, signature);
      console.log('✅ Stripe Webhook Event:', event.type);
    } catch (err) {
      console.error('❌ Webhook signature verification failed.', err.message);
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log('✅ Session payload received:', session);

      const userId = session.metadata?.userId;
      const planId = session.metadata?.planId;
      const paymentIntentId = session.payment_intent as string;

      if (!userId || !planId || !paymentIntentId) {
        console.warn('❗ Missing metadata in session. Skipping.');
        return response.status(400).send('Missing metadata');
      }

      // Prevent duplicate records
      const existing = await this.prisma.userSubscription.findFirst({
        where: { paymentIntentId },
      });

      if (existing) {
        console.log('⚠️ Subscription already exists for this paymentIntentId. Skipping creation.');
        return response.status(200).send('Duplicate event handled');
      }

      // Fetch payment intent to get invoice URL
      let invoiceUrl: string | null = null;
      try {
        const paymentIntent = await this.stripeService.getPaymentIntent(paymentIntentId);
        const charge = paymentIntent?.charges?.data?.[0];
if (
  charge?.invoice &&
  typeof charge.invoice === 'string'
) {
  const invoice = await this.stripeService.getInvoice(charge.invoice);
  invoiceUrl = invoice?.hosted_invoice_url || null;
}
      } catch (err) {
        console.error('❌ Failed to fetch invoice:', err.message);
      }

      // Calculate dynamic end date for subscription (30 days from now)
      const endDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days

      await this.prisma.userSubscription.create({
        data: {
          userId,
          planId,
          endDate,
          paymentStatus: PaymentStatus.PAID,
          paymentIntentId,
          paymentMethod: 'card',
          paidAt: new Date(),
          invoiceUrl,
        },
      });

      console.log('✅ UserSubscription created for user:', userId);
    }

    return response.status(200).send('Webhook received');
  }
}
