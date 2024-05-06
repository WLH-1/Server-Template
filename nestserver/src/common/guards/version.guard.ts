import {
  ExecutionContext,
  Injectable,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import Key from 'src/config/env';
const rp = require('request-promise');

@Injectable()
export class VersionGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    let headers = context.switchToHttp().getRequest().headers;
    console.log(headers);
    

    return true;
  }
}
