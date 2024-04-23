import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { DemoController } from './demo.controller';
import { DemoService } from './demo.service';
import { User, UserSchema } from 'src/models/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { DemoMiddleware, DemoOtherMiddleware } from 'src/common/middleware/demo.middleware';


// 有此模块整合后统一在根模块暴露
@Module({
  // 用于引入字段表
  imports: [
    MongooseModule.forFeature(
      [
        { name: User.name, schema: UserSchema, collection: 'user' }
      ],
      'nestDB', // 这里的数据库连接名称要与你的设置相匹配
    ),
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
