// src/main/profile/profile.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async getMyProfile(userId: any) {
    if (!userId) {
      throw new NotFoundException('User ID is required');
    }
  
    console.log('Fetching profile for userId:', userId.sub);  // Debugging log
  
    const profile = await this.prisma.profile.findUnique({
      where: { userId: userId.sub },  // Ensure correct field is used
    });
  
    if (!profile) {
      throw new NotFoundException('Profile not found');
    }
  
    return profile;
  }
}
