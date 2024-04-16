import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { DemoService } from './demo.service';
import { DemoController } from './demo.controller';

import { DemoMiddleware, DemoOtherMiddleware } from 'src/common/middleware/demo.middleware';

// import { Staff, StaffSchema } from 'src/models/staff.schema';

// 有此模块整合后统一在根模块暴露
@Module({
  // 用于引入字段表
  imports: [
    // MongooseModule.forFeature(
    //   [
    //     { name: Staff.name, schema: StaffSchema, collection: 'staff' },
    //   ],
    //   'commDB',
    // ),
  ],
  // 用于引入控制器
  controllers: [DemoController],
  // 用于引入服务,或者一些公共函数等
  providers: [DemoService]
})
export class DemoModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DemoMiddleware)
      .forRoutes(
        {
          path: 'demo/add',
          method: RequestMethod.GET
        }
    );
    consumer.apply(DemoOtherMiddleware)
      .forRoutes(
        {
          path: 'demo',
          method: RequestMethod.GET
        }
    );
  }
  
}