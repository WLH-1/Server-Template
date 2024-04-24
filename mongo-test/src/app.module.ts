import { resolve } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from 'nestjs-config';
import { MongodemoModule } from './modules/mongodemo/mongodemo.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import Key from './config/env';

@Module({
  imports: [
    ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    MongooseModule.forRoot(Key.workDBUrl),
    MongodemoModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
