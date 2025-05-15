import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err, user, info, context) {
        // console.log('JWT Guard — err:', err);
        // console.log('JWT Guard — user:', user);
        // console.log('JWT Guard — info:', info);
        return user;
      }
}
