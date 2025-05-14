import { Controller, Post, Body } from '@nestjs/common';
import { StripeService } from '../stripe/stripe.service';



@Controller('payment')
export class BillingController {
  constructor(private stripeService: StripeService) {}

  @Post('checkout')
  async createCheckout(@Body() body: { userId: string; planId: string; amount: number }) {
    const successUrl = 'http://localhost:3000/success';
    const cancelUrl = 'http://localhost:3000/cancel';

    const url = await this.stripeService.createCheckoutSession({
      userId: body.userId,
      planId: body.planId,
      amount: body.amount,
      successUrl,
      cancelUrl,
    });

    return { url };
  }
}
