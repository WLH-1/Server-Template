import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthorizationService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    return { username, password };
  }
}
