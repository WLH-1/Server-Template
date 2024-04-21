import { Module } from '@nestjs/common';
import { resolve } from 'path';
import { ConfigModule } from 'nestjs-config';
import { DemoModule } from './modules/demo/demo.module';
import { UploadModule } from './modules/upload/upload.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import Key from './config/env';



@Module({
  imports: [
    ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    MongooseModule.forRoot(Key.nestDBUrl, {
      connectionName: 'work',
    }),
    DemoModule,
    UploadModule,
    ScheduleModule.forRoot(),
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
