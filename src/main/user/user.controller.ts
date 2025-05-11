import {
    Controller,
    UseGuards,
    Patch,
    Body,
    Req,
    Post,
    UseInterceptors,
    UploadedFile,
  } from '@nestjs/common';
  import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UpdateUserDto } from './update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { cloudinaryStorage } from 'src/config/coudinary.storage';
  
  @Controller('users')
  @UseGuards(JwtAuthGuard)
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    @Patch('update-profile')
    async updateProfile(@Req() req, @Body() dto: UpdateUserDto) {
      const userId = req.user.sub;
      return this.userService.updateProfile(userId, dto);
    }

    @Post('upload-profile-image')
@UseInterceptors(FileInterceptor('file', { storage: cloudinaryStorage }))
async uploadProfileImage(@UploadedFile() file: Express.Multer.File, @Req() req) {
  const userId = req.user.sub;
  const imageUrl = file.path;
  return this.userService.updateProfileImage(userId, imageUrl);
}
  }
  