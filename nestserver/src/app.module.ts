import { Module } from '@nestjs/common';
import { resolve } from 'path';
import { ConfigModule } from 'nestjs-config';
import Key from './config/env';
import { DemoModule } from './modules/app/demo/demo.module';
import { UploadModule } from './modules/app/upload/upload.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthorizationModule } from './modules/app/authorization/authorization.module';



@Module({
  imports: [
    ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    MongooseModule.forRoot(Key.nestDBUrl, {
      retryDelay: 6000, // 设置重试延迟（毫秒）
    }),
    DemoModule,
    UploadModule,
    AuthorizationModule,
    ScheduleModule.forRoot(),
  ],
  providers: [],
  controllers: [],
})
export class AppModule {}
