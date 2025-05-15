import { Controller, Post, Body } from '@nestjs/common';
import { StripeService } from '../stripe/stripe.service';
import { CreateCheckoutDto } from './create-checkout.dto';


@Controller('payment')
export class BillingController {
  constructor(private stripeService: StripeService) {}

  @Post('checkout')
  async createCheckout(@Body() body: CreateCheckoutDto) {
    const { userId, planId, amount } = body;

    const successUrl = 'http://localhost:3000/success';
    const cancelUrl = 'http://localhost:3000/cancel';

    const url = await this.stripeService.createCheckoutSession({
      userId,
      planId,
      amount,
      successUrl,
      cancelUrl,
    });

    return { url };
  }
}
