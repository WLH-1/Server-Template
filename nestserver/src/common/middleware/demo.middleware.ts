import { Injectable, NestMiddleware } from '@nestjs/common';
import { log } from 'console';

@Injectable()
export class DemoMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('我是demo中间件',new Date());
    next();
  }
}

@Injectable()
export class DemoOtherMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('我是demo其他中间件', new Date());
    next();
  }
}
