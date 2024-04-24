import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongodemoController } from './mongodemo.controller';
import { MongodemoService } from './mongodemo.service';
import { User, UserSchema } from 'src/models/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        { name: User.name, schema: UserSchema, collection: 'user' }
      ],
    ),
  ],
  controllers: [MongodemoController],
  providers: [MongodemoService]
})
export class MongodemoModule {}
