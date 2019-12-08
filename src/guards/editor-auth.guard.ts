import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class EditorAuthGuard extends AuthGuard('jwt') {

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (!user) {
      throw  new UnauthorizedException('Account does not exist!');
    }
    const { role, limit } = user;
    if (role !== 'editor' && role !== 'admin') {
      throw  new UnauthorizedException('Authority is too low!');
    }
    if (limit) {
      throw  new UnauthorizedException('Account is limited!');
    }
    return user;
  }

}
