import { Injectable, NotFoundException } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { PromoCodeService } from '../promo-code/promo-code.service';


@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    private configService: ConfigService,
    private promoCodeService: PromoCodeService,
  ) {
    const stripeSecretKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    if (!stripeSecretKey) {
      throw new Error('STRIPE_SECRET_KEY is not defined in the environment variables');
    }

    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2025-04-30.basil',
    });
  }

  async createCheckoutSession({
    userId,
    planId,
    amount,
    successUrl,
    cancelUrl,
    promoCode,
  }: {
    userId: string;
    planId: string;
    amount: number;
    successUrl: string;
    cancelUrl: string;
    promoCode?: string;
  }) {
    let finalAmount = amount;

    // ✅ Apply discount if promo code is valid
    if (promoCode) {
      const { valid, promo } = await this.promoCodeService.validatePromoCode(promoCode);
      if (!valid) throw new NotFoundException('Promo code is expired or invalid');
      finalAmount = amount - promo.discount;

      // Ensure price doesn't go below 0
      if (finalAmount < 0) finalAmount = 0;
    }

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Subscription for Plan ID: ${planId}`,
            },
            unit_amount: Math.round(finalAmount * 100), // amount in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId,
        planId,
        promoCode: promoCode || 'N/A',
        originalAmount: amount.toString(),
        discountedAmount: finalAmount.toString(),
      },
    });

    return session.url;
  }

  async constructWebhookEvent(payload: Buffer, signature: string) {
    const endpointSecret = this.configService.get<string>('STRIPE_WEBHOOK_SECRET');
    if (!endpointSecret) {
      throw new Error('STRIPE_WEBHOOK_SECRET is not defined in environment variables');
    }

    return this.stripe.webhooks.constructEvent(payload, signature, endpointSecret);
  }

  async getPaymentIntent(
    paymentIntentId: string,
  ): Promise<
    Stripe.PaymentIntent & {
      charges: Stripe.ApiList<Stripe.Charge & { invoice?: string | Stripe.Invoice }>;
    }
  > {
    const response = await this.stripe.paymentIntents.retrieve(paymentIntentId, {
      expand: ['charges.data.invoice'],
    });

    return response as unknown as Stripe.PaymentIntent & {
      charges: Stripe.ApiList<Stripe.Charge & { invoice?: string | Stripe.Invoice }>;
    };
  }

  async getInvoice(invoiceId: string): Promise<Stripe.Invoice> {
    return await this.stripe.invoices.retrieve(invoiceId);
  }
}
