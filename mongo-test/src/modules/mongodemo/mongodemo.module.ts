import { Module } from '@nestjs/common';
import { MongodemoController } from './mongodemo.controller';
import { MongodemoService } from './mongodemo.service';

@Module({
  controllers: [MongodemoController],
  providers: [MongodemoService]
})
export class MongodemoModule {}
