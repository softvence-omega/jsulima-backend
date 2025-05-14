import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePlanDto, UpdatePlanDto } from './create-plan.dto';


@Injectable()
export class PlanService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreatePlanDto) {
    return this.prisma.plan.create({ data: dto });
  }

  findAll() {
    return this.prisma.plan.findMany({
      include: {
        subscriptions: {
          include: {
            user: true,
            appliedPromoCode: true,
          },
        },
      },
    });
  }
  
  findOne(id: string) {
    return this.prisma.plan.findUnique({
      where: { id },
      include: {
        subscriptions: {
          include: {
            user: true,
            appliedPromoCode: true,
          },
        },
      },
    });
  }

  update(id: string, dto: UpdatePlanDto) {
    return this.prisma.plan.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.plan.delete({ where: { id } });
  }
}
