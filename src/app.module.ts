import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './main/auth/auth.module';
import { UserModule } from './main/user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProfileModule } from './main/profile/profile.module';
import { PrismaService } from './prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './main/auth/auth.service';
import { AuthController } from './main/auth/auth.controller';
import { JwtStrategy } from './main/auth/strategies/jwt.strategy';
import { PlanModule } from './main/plan/plan.module';
import { PromoCodeModule } from './main/promo-code/promo-code.module';
import { SubscriptionModule } from './main/subscription/subscription.module';
import { DashboardService } from './main/dashboard/dashboard.service';
import { DashboardController } from './main/dashboard/dashboard.controller';
import { DashboardModule } from './main/dashboard/dashboard.module';

import { StripeService } from './main/stripe/stripe.service';
import { StripeModule } from './main/stripe/stripe.module';
import { BillingModule } from './main/billing/billing.module';
import { StripeController } from './main/stripe/stripe.controller';


@Module({
  imports: [
    PassportModule,
    AuthModule,
    UserModule,
    ProfileModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PlanModule,
    PromoCodeModule,
    PrismaModule,
    SubscriptionModule,
    DashboardModule,
    BillingModule,
    StripeModule
  ],
  controllers: [AppController, DashboardController, StripeController],
  providers: [AppService, AuthService, JwtStrategy, PrismaService, DashboardService, StripeService],
})
export class AppModule {}
