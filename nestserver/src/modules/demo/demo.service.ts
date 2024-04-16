import { Injectable } from '@nestjs/common';
// import { StaffDocument } from 'src/models/staff.schema';
// import { TransactionUtil } from 'src/util/transaction.util';

@Injectable()
export class DemoService {
    // 可用于注入一些字段模型集合，公共函数等
    constructor(
        // @InjectModel('Staff')
        // private readonly staffModel: Model<StaffDocument>,
        // private readonly transaction: TransactionUtil,
    ) { }
    add123(query) {
        return [
            {...query},
            {title:'我是你爹'}
        ]
    }
}
