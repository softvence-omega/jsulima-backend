// src/main/profile/profile.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async getMyProfile(userId: string) {
    if (!userId) {
      throw new NotFoundException('User ID is required');
    }
  
    const profile = await this.prisma.profile.findUnique({
      where: { userId: userId },
    });
  
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
  
    return profile;
  }

//   async updateMyProfile(userId: number, data: any) {
//     const profile = await this.prisma.profile.upsert({
//       where: { userId },
//       update: data,
//       create: {
//         ...data,
//         user: { connect: { id: userId } },
//       },
//     });
  
//     return profile;
//   }
}
