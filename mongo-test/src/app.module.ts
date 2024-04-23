import { Module } from '@nestjs/common';
import { MongodemoModule } from './modules/mongodemo/mongodemo.module';

@Module({
  imports: [MongodemoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
