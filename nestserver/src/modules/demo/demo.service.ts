import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/models/user.schema';
// import { TransactionUtil } from 'src/util/transaction.util';

@Injectable()
export class DemoService {
    // 可用于注入一些字段模型集合，公共函数等
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<UserDocument>,
    ){}

    add123(query) {
        return [
            {...query},
            {title:''}
        ]
    }
}
