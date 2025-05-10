// src/main/profile/profile.controller.ts

import {
    Controller,
    Get,
    UseGuards,
    Patch,
    Body,
    Req,
  } from '@nestjs/common';
  import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
  import { ProfileService } from './profile.service';
  
  @Controller('profile')
  @UseGuards(JwtAuthGuard)
  export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}
  
    @Get('me')
    getMyProfile(@Req() req: any) {
      return this.profileService.getMyProfile(req.user.userId);
    }
  
    @Patch('me')
    updateMyProfile(@Req() req: any, @Body() body: any) {
      return this.profileService.updateMyProfile(req.user.userId, body);
    }
  }
  