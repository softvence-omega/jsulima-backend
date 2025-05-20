import {
  Controller,
  Post,
  Body,
  Req,
  UseGuards,
} from '@nestjs/common';
import { StripeService } from '../stripe/stripe.service';
import { CreateCheckoutDto } from './create-checkout.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('payment')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
export class BillingController {
  constructor(private stripeService: StripeService) {}

  @Post('checkout')
  async createCheckout(@Req() req, @Body() body: Omit<CreateCheckoutDto, 'userId'>) {
    const userId = req.user.sub; // get authenticated user ID securely
    const { planId, amount } = body;

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
