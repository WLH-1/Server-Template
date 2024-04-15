import { Controller, Get, Post, Query } from '@nestjs/common';
import { DemoService } from './demo.service';
import { query } from 'express';
@Controller('demo')
export class DemoController {
    //注入DemoService，可调用DemoService中的业务方法
    constructor(private readonly demoServer: DemoService) { }

    @Get()
    getDemo() {
        return '123'
    }

    @Get('/add')
    add123(@Query() query) {
        return this.demoServer.add123(query)
    }
}
