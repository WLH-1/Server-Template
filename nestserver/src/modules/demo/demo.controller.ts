import { Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { DemoService } from './demo.service';

import {AuthGuard} from '../../common/guards/auth.guard'
import { query } from 'express';

@Controller('demo')
// 控制器中使用守卫，一般用于权限判断
// @UseGuards(AuthGuard)
export class DemoController {
    //注入DemoService，可调用DemoService中的业务方法
    constructor(private readonly demoServer: DemoService) { }

    @Get()
    // 路由中也可单独使用守卫，一般用于权限判断
    // @UseGuards(AuthGuard)
    getDemo() {
        return '123'
    }

    @Get('/add')
    add123(@Query() query) {
        return this.demoServer.add123(query)
    }
}
