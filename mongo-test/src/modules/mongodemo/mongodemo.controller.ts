import { Controller, Get, Query } from '@nestjs/common';
import { MongodemoService } from './mongodemo.service';

@Controller('mongodemo')
export class MongodemoController {
    constructor(private readonly demoServer: MongodemoService) { }

    @Get('/add')
    add123(
        @Query() query
    ) {
        return this.demoServer.add123(query)
    }
}
