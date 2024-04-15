import { Injectable } from '@nestjs/common';

@Injectable()
export class DemoService {
    constructor(
        // 可用于注入一些字段表，公共函数等
    ) { }
    add123(query) {
        return [
            {...query},
            {title:'我是你爹'}
        ]
    }
}
