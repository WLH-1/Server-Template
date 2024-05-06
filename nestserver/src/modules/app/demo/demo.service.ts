import { Injectable } from '@nestjs/common';
import { ResponseUtil } from 'src/util/response.util';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {UserDocument } from 'src/models/user.schema';
// import { TransactionUtil } from 'src/util/transaction.util';
import { Response, DecodeToken } from 'src/common/interfaces/api.interface';
import { Code } from 'src/common/interfaces/code.enum';


import { UserQueryDTO } from './dto/demo.dto'

@Injectable()
export class DemoService {
    // 可用于注入一些字段模型集合，公共函数等
    constructor(
        @InjectModel('User')
        private readonly userModel: Model<UserDocument>,
        private readonly response: ResponseUtil,
    ) { }
    
    async add123(
        query: UserQueryDTO,
        user: DecodeToken
    ): Promise<Response>  {
        const { name } = query
        let list = await this.userModel.find();
        let total = await this.userModel.countDocuments()
        return this.response.createResponse(
            Code.OK,
            '用户查询成功',
            {
                data: list,
                total
            },
        ); 
    }
}
