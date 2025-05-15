// dto/forgot-password.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ForgotPasswordDto {
    @ApiProperty({
      example: 'user@example.com',
      description: 'The email address associated with the account',
    })
    @IsEmail()
    email: string;
  }
// dto/reset-password.dto.ts
import { IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
    @ApiProperty({
      example: '123456abcdef7890',
      description: 'The reset token received via email',
    })
    @IsString()
    token: string;
  
    @ApiProperty({
      example: 'newSecurePassword123',
      description: 'The new password (minimum 6 characters)',
      minLength: 6,
    })
    @IsString()
    @MinLength(6)
    newPassword: string;
  }



  export class ChangePasswordDto {
    @ApiProperty({ example: 'oldPass123', description: 'Current password' })
    @IsString()
    currentPassword: string;
  
    @ApiProperty({ example: 'newPass123', description: 'New password', minLength: 6 })
    @IsString()
    @MinLength(6)
    newPassword: string;
  
    @ApiProperty({ example: 'newPass123', description: 'Retype new password' })
    @IsString()
    retypeNewPassword: string;
  }