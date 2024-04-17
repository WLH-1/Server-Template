import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { InitMiddleware } from './common/middleware/init.middleware';
import { ValidationPipe } from './common/pipes/validation.pipe';
import { Reflector } from '@nestjs/core';

import { JwtAuthGuard } from './common/guards/auth.guard'


async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // 允许跨域请求
    cors: {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204,
    },
  });
  // 全局使用中间件
  app.use(new InitMiddleware().use);

  app.useGlobalPipes(new ValidationPipe()); //接口参数验证管道，验证数据合法性

  let reflector = new Reflector();
  // 全局使用守卫
  app.useGlobalGuards(new JwtAuthGuard(reflector))


  await app.listen(3000);
}
bootstrap();
