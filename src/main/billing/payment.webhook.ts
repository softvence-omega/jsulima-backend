import { Controller, Headers, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';

import { PrismaService } from 'src/prisma/prisma.service';
import { StripeService } from '../stripe/stripe.service';

@Controller('webhook/stripe')
export class WebhookController {
  constructor(
    private stripeService: StripeService,
    private prisma: PrismaService,
  ) {}

  @Post()
  async handleWebhook(@Req() req: Request, @Res() res: Response, @Headers('stripe-signature') signature: string) {
    const event = await this.stripeService.constructWebhookEvent(req['rawBody'], signature);

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
      
        if (!session.metadata) {
          throw new Error('Missing metadata in Stripe session');
        }
      
        const userId = session.metadata.userId;
        const planId = session.metadata.planId;
      
        await this.prisma.userSubscription.create({
          data: {
            userId,
            planId,
            startDate: new Date(),
            endDate: new Date(new Date().setMonth(new Date().getMonth() + 1)), // 1 month
            paymentStatus: 'SUCCESS',
            paymentIntentId: session.payment_intent as string,
            paymentMethod: session.payment_method_types?.[0] || null,
            paidAt: new Date(),
            invoiceUrl: session.invoice as string,
          },
        });
      }
      
    res.status(200).send('Webhook received');
  }
}
