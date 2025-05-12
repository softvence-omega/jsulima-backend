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
        phone: dto.phoneNumber,
        userId: user.id,
      },
    });
  
    return user;
  }
  

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }


  async updateProfile(userId: string, dto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { ...dto },
    });
  }

  async updateProfileImage(userId: string, imageUrl: string) {
    return this.prisma.user.update({
      where: { id: userId },
      data: { image: imageUrl },
    });
  }
}
