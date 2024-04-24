import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {UserDocument } from 'src/models/user.schema';

@Injectable()
export class MongodemoService {
    constructor(
        @InjectModel("User")
        private readonly userModel: Model<UserDocument>
    ) { }

    async add123(query) {
        let list = await this.userModel.find()
        return list
    }
}
 