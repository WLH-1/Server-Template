import {
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { myRedisUtil } from 'src/util/redis.util';
import Key from 'src/config/env';
const rp = require('request-promise');

@Injectable()
export class VersionGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    let headers = context.switchToHttp().getRequest().headers;

    if (
      headers &&
      headers['type'] &&
      headers['version'] &&
      headers['ischeckversion'] == 'true'
    ) {
      let type = headers['type']; //web  app appH5 staff staffH5
      let version = headers['version'];
      const options = {
        uri: `${Key.viewUrl}/hot/api/update/newestVersion`,
        method: 'GET',
        qs: { type },
        json: true,
      };
      let res = await rp(options);

      if (Number(res.version) !== Number(version)) {
        throw new HttpException(
          { error: { ...res } },
          HttpStatus.PRECONDITION_FAILED,
        );
      }
    }

    return true;
  }
}
