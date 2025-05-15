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
    let event;

    try {
      event = await this.stripeService.constructWebhookEvent(request.body, signature);
    } catch (err) {
      console.error('❌ Webhook signature verification failed.', err.message);
      return response.status(400).send(`Webhook Error: ${err.message}`);
    }

    // ✅ Handle `checkout.session.completed`
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;
      const planId = session.metadata?.planId;
      const paymentIntentId = session.payment_intent as string;

      if (userId && planId) {
        // Create UserSubscription
        await this.prisma.userSubscription.create({
            data: {
              userId,
              planId,
              endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
              paymentStatus: PaymentStatus.PAID,
              paymentIntentId,
              paymentMethod: 'card',
              paidAt: new Date(),
              invoiceUrl: typeof session.invoice === 'string' ? session.invoice : null,
            },
          });

        console.log('✅ Subscription created for user:', userId);
      }
    }

    return response.status(200).send('Webhook received');
  }
}
