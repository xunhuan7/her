import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class EditorAuthGuard extends AuthGuard('jwt') {

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    const { role } = user;
    if (role !== 'editor' && role !== 'admin') {
      throw err || new UnauthorizedException('Authority is too low!');
    }
    return user;
  }

}
