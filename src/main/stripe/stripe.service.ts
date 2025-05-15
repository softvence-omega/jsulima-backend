import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(private configService: ConfigService) {
    const stripeSecretKey = this.configService.get<string>('STRIPE_SECRET_KEY');
    if (!stripeSecretKey) {
      throw new Error(
        'STRIPE_SECRET_KEY is not defined in the environment variables',
      );
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
  }: {
    userId: string;
    planId: string;
    amount: number;
    successUrl: string;
    cancelUrl: string;
  }) {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Subscription for Plan ID: ${planId}`,
            },
            unit_amount: amount * 100, // in cents
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
      },
    });
    console.log(session);
    return session.url;
  }

  async constructWebhookEvent(payload: Buffer, signature: string) {
    const endpointSecret = this.configService.get<string>(
      'STRIPE_WEBHOOK_SECRET',
    );

    if (!endpointSecret) {
      throw new Error(
        'STRIPE_WEBHOOK_SECRET is not defined in environment variables',
      );
    }

    return this.stripe.webhooks.constructEvent(
      payload,
      signature,
      endpointSecret,
    );
  }

  async getPaymentIntent(
    paymentIntentId: string,
  ): Promise<
    Stripe.PaymentIntent & {
      charges: Stripe.ApiList<
        Stripe.Charge & { invoice?: string | Stripe.Invoice }
      >;
    }
  > {
    const response = await this.stripe.paymentIntents.retrieve(paymentIntentId, {
      expand: ['charges.data.invoice'],
    });
  
    return response as unknown as Stripe.PaymentIntent & {
      charges: Stripe.ApiList<
        Stripe.Charge & { invoice?: string | Stripe.Invoice }
      >;
    };
  }
  

  async getInvoice(invoiceId: string): Promise<Stripe.Invoice> {
    return await this.stripe.invoices.retrieve(invoiceId);
  }
}
