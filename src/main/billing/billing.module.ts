import { Module } from '@nestjs/common';
import { BillingController } from './billing.controller';
import { BillingService } from './billing.service';
import { StripeModule } from '../stripe/stripe.module';

@Module({
  imports: [StripeModule],
  controllers: [BillingController],
  providers: [BillingService]
})
export class BillingModule {}



// import { Module } from '@nestjs/common';
// import { StripeService } from './billing.service';


// @Module({
//   providers: [StripeService],
//   exports: [StripeService],
// })
// export class StripeModule {}
