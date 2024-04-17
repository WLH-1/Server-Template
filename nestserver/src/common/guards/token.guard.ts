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
  constructor(private reflector: Reflector, private readonly redis: myRedisUtil) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    let user = context.switchToHttp().getRequest().user;
    let deviceId = context.switchToHttp().getRequest().headers.deviceid;

    if (user) {
      //路由黑名单
      let isBlack = await this.redis.myGetRedis(
        'authorization',
        0,
        'token' + user._id,
      );
      if (isBlack) {
        throw new HttpException(
          { error: 'Invalid Authorization' },
          HttpStatus.UNAUTHORIZED,
        );
      }

      let url = context.switchToHttp().getRequest().url
      if (url.indexOf('staffApp') >= 0 && !user.type) {
        throw new HttpException(
          { error: 'Invalid Authorization' },
          HttpStatus.UNAUTHORIZED,
        );
      }

      switch (user.type) {
        case 'staffApp':

          let version = context.switchToHttp().getRequest().headers.versioncode;
          let deviceIdRedis = await this.redis.myGetRedis(
            'authorization',
            0,
            'staffApp' + user._id,
          );

          if (((deviceIdRedis && deviceIdRedis !== deviceId) || !deviceId) && version) {
            throw new HttpException(
              { error: 'Invalid Authorization' },
              HttpStatus.UNAUTHORIZED,
            );
          }
          break;

        default:
          break;
      }
    }

    return true;
  }
}
