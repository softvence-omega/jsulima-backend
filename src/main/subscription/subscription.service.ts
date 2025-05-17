import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSubscriptionDto } from './create-subscription.dto';
import { UpdateSubscriptionDto } from './update-subscription.dto';


@Injectable()
export class SubscriptionService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateSubscriptionDto) {
    // Check if plan exists
    const plan = await this.prisma.plan.findUnique({ where: { id: dto.planId } });
    if (!plan) throw new NotFoundException('Plan not found');

    // Optional promo code validation
    if (dto.promoCodeId) {
      const promo = await this.prisma.promoCode.findUnique({
        where: { id: dto.promoCodeId },
      });

      if (!promo || new Date(promo.expiresAt) < new Date()) {
        throw new NotFoundException('Invalid or expired promo code');
      }
    }

    return this.prisma.userSubscription.create({ data: dto });
  }

  async findAll() {
    return this.prisma.userSubscription.findMany({
      include: {
        user: true,
        plan: true,
        appliedPromoCode: true,
      },
    });
  }

  async findByUser(userId: string) {
    return this.prisma.userSubscription.findMany({
      where: { userId },
      include: {
        plan: true,
        appliedPromoCode: true,
      },
    });
  }

  async getRevenueStats() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    // Current month revenue
    const currentMonthSubs = await this.prisma.userSubscription.findMany({
      where: {
        paymentStatus: 'PAID',
        paidAt: {
          gte: startOfMonth,
          lt: endOfMonth,
        },
      },
      select: {
        plan: {
          select: {
            price: true,
          },
        },
      },
    });

    const currentMonthRevenue = currentMonthSubs.reduce((sum, sub) => sum + sub.plan.price, 0);

    // All-time revenue
    const allTimeSubs = await this.prisma.userSubscription.findMany({
      where: {
        paymentStatus: 'PAID',
      },
      select: {
        plan: {
          select: {
            price: true,
          },
        },
      },
    });

    const allTimeRevenue = allTimeSubs.reduce((sum, sub) => sum + sub.plan.price, 0);

    return {
      currentMonthRevenue: Number(currentMonthRevenue.toFixed(2)),
      allTimeRevenue: Number(allTimeRevenue.toFixed(2)),
    };
  }

  async update(id: string, dto: UpdateSubscriptionDto) {
    return this.prisma.userSubscription.update({
      where: { id },
      data: dto,
    });
  }

  async cancel(id: string) {
    return this.prisma.userSubscription.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async remove(id: string) {
    return this.prisma.userSubscription.delete({ where: { id } });
  }
}
