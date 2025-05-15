import { Injectable } from '@nestjs/common';
import { PlanStatus, PlanType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getMetrics() {
    const [
      totalUsers,
      successfulSubscriptions,
      activeSubscriptions,
      activePromoCodes,
      mostPopularPlan
    ] = await Promise.all([
      this.prisma.user.count(),

      this.prisma.userSubscription.findMany({
        where: { paymentStatus: 'SUCCESS' },
        include: { plan: true },
      }),

      this.prisma.userSubscription.count({
        where: { isActive: true },
      }),

      this.prisma.promoCode.count({
        where: {
          expiresAt: { gt: new Date() },
        },
      }),

      this.prisma.userSubscription.groupBy({
        by: ['planId'],
        _count: { planId: true },
        orderBy: { _count: { planId: 'desc' } },
        take: 1,
      }),
    ]);

    // Calculate total revenue manually from plans
    const totalRevenue = successfulSubscriptions.reduce((acc, sub) => {
      return acc + (sub.plan?.price || 0);
    }, 0);

    // Handle topPlan type explicitly
    let topPlan: { id: string; isActive: boolean; title: string; description: string; price: number; features: string[]; planType: PlanType; status: PlanStatus; createdAt: Date; updatedAt: Date } | null = null;

    if (mostPopularPlan.length > 0) {
      topPlan = await this.prisma.plan.findUnique({
        where: { id: mostPopularPlan[0].planId },
      });
    }

    return {
      totalUsers,
      totalRevenue,
      activeSubscriptions,
      activePromoCodes,
      mostPopularPlan: topPlan,
    };
  }
}
