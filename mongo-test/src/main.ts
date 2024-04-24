import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Key from './config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(Key.port);
}
bootstrap();
