import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from '../auth/register.dto';
import { UpdateUserDto } from './update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        fullName: dto.fullName,
        email: dto.email,
        password: hashedPassword,
        phoneNumber: dto.phoneNumber,
        role: 'USER',
      },
    });

    await this.prisma.profile.create({
      data: {
        name: dto.fullName,
        userName: dto.userName,
        phone: dto.phoneNumber,
        image: dto.image,
        country: dto.country,
        userId: user.id,
      },
    });

    return user;
  }

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        phoneNumber: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        // you can include profile if you want:
        profile: {
          select: {
            userName: true,
            image: true,
            country: true,
          },
        },
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async updateProfile(userId: string, dto: UpdateUserDto) {
    // Split the DTO to separate user and profile fields
    const { fullName, phoneNumber, country, userName, image } = dto;

    // Update user model fields
    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: {
        ...(fullName && { fullName }),
        ...(phoneNumber && { phoneNumber }),
      },
    });

    // Update profile model fields
    const updatedProfile = await this.prisma.profile.update({
      where: { userId }, // Because Profile.userId is unique
      data: {
        ...(country && { country }),
        ...(userName && { userName }),
        ...(image && { image }),
      },
    });

    return { ...updatedUser, profile: updatedProfile };
  }

  async updateProfileImage(userId: string, imageUrl: string) {
    return this.prisma.profile.update({
      where: { userId },
      data: { image: imageUrl },
    });
  }


}
