// import { Module } from '@nestjs/common';
// import { PromoCodeController } from './promo-code.controller';
// import { PromoCodeService } from './promo-code.service';
// import { PrismaService } from 'src/prisma/prisma.service';

// @Module({
//   controllers: [PromoCodeController],
//   providers: [PromoCodeService]
// })
// export class PromoCodeModule {}



import { Module } from '@nestjs/common';
import { PromoCodeService } from './promo-code.service';
import { PromoCodeController } from './promo-code.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PromoCodeController],
  providers: [PromoCodeService, PrismaService],
})
export class PromoCodeModule {}
