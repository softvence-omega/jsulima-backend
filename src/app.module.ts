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
import { PromoCodeModule } from './main/promo-code/promo-code.module';

@Module({
  imports: [
    PassportModule,
    PrismaModule,
    AuthModule,
    UserModule,
    ProfileModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PlanModule,
    PromoCodeModule,
    
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, JwtStrategy],
})
export class AppModule {}
