import {
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { myRedisUtil } from 'src/util/redis.util';

@Injectable()
export class TokenGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    let user = context.switchToHttp().getRequest().user;
    let deviceId = context.switchToHttp().getRequest().headers.deviceid;
    return true;
  }
}
