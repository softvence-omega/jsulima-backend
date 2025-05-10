import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      const roles = this.reflector.get<string[]>('roles', context.getHandler());
      if (!roles) return true;
  
      const user = context.switchToHttp().getRequest().user;
      if (!user || !roles.includes(user.role)) {
        throw new ForbiddenException('Access Denied');
      }
  
      return true;
    }
  }
  