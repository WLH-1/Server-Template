import { Controller, Get, Post, Query, UseGuards, Request } from '@nestjs/common';
import { DemoService } from './demo.service';


// 添加自定义元数据标记，表示此路由为公开接口
import { Public } from 'src/common/decorator/public.decorator';
import {
    Response,
    Requestparameter,
    Headerparameter,
} from 'src/common/interfaces/api.interface';
import { UserQueryDTO } from './dto/demo.dto'

@Controller('demo')
// 控制器中使用守卫，一般用于权限判断
// @UseGuards(JwtAuthGuard)
export class DemoController {
    //注入DemoService，可调用DemoService中的业务方法
    constructor(private readonly demoServer: DemoService) { }

    @Get()
    // 路由中也可单独使用守卫，一般用于权限判断
    // @UseGuards(JwtAuthGuard)
    getDemo() {
        return '123'
    }

    @Get('/add')
    add123(
        @Query() query: UserQueryDTO,
        @Request() { user }: Requestparameter,
    ): Promise<Response>{
        return this.demoServer.add123(query, user)
    } 
}
