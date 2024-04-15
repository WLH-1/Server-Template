import { Module } from '@nestjs/common';
import { DemoModule } from './modules/demo/demo.module';
import { UploadModule } from './modules/upload/upload.module';


@Module({
  imports: [DemoModule,UploadModule],
  providers: [],
  controllers: [],
})
export class AppModule {}
