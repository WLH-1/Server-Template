import { Module } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { AuthorizationController } from './authorization.controller';
import Key from 'src/config/env';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { ResponseUtil } from 'src/util/response.util';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: User.name, schema: UserSchema, collection: 'user' }
      ]
    ),
    PassportModule,
    JwtModule.register({
      secret: Key.jwtSecret,
      signOptions: { expiresIn: '100y' },
    }),
  ],
  providers: [
    AuthorizationService,
    LocalStrategy,
    ResponseUtil,
    JwtStrategy,
  ],
  controllers: [AuthorizationController]
})
export class AuthorizationModule {}
