import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePromoCodeDto, UpdatePromoCodeDto } from './promo-code.dto';


@Injectable()
export class PromoCodeService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreatePromoCodeDto) {
    return this.prisma.promoCode.create({ data: dto });
  }

  findAll() {
    return this.prisma.promoCode.findMany({ include: { user: true } });
  }

  findOne(id: string) {
    return this.prisma.promoCode.findUnique({ where: { id }, include: { user: true } });
  }

  update(id: string, dto: UpdatePromoCodeDto) {
    return this.prisma.promoCode.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.promoCode.delete({ where: { id } });
  }
}
