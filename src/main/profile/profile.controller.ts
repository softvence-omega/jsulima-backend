import {
  Controller,
  Get,
  Patch,
  UseGuards,
  Req,
  Body,
  Post,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ProfileService } from './profile.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('profile')
// @UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('me')
  getMyProfile(@Req() req: any) {
    // console.log('User ID:', req?.user);
    return this.profileService.getMyProfile(req.user);
  }

  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  // @Post('me')
  // getMe(@Req() req) {
  //   return req.user;
  // }

  //   @Patch('me')
  //   updateMyProfile(@Req() req: any, @Body() body: any) {
  //     return this.profileService.updateMyProfile(req.user.userId, body);
  //   }
}
