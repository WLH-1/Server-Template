import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from 'src/models/user.schema';
import { Code } from 'src/common/interfaces/code.enum';
import { Response, DecodeToken } from 'src/common/interfaces/api.interface';
import { ResponseUtil } from 'src/util/response.util';
import Key from 'src/config/env';
import * as CryptoJS from 'crypto-js'; 
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthorizationService {
    constructor(
        @InjectModel('User')
        private readonly userModel: Model<UserDocument>,
        private readonly response: ResponseUtil,
        private readonly jwtService: JwtService,

    ) { }

    async login(
        username: string,
        password: string,
    ): Promise<Response<{ access_token: string }>> {//这是该函数的返回类型定义。它表示这个异步函数返回一个 Promise，该 Promise 的解析值是一个包含 access_token 属性的对象。
        let ifUser = await this.userModel.findOne({ username: username }).lean()
        if (!ifUser) {
            return this.response.createResponse(
                Code.CONFLICT,
                '该用户不存在',
            );
        }
        let hash = CryptoJS.HmacSHA256(password, Key.jwtSecret).toString();
        if (ifUser.password != hash) {
            return this.response.createResponse(
                Code.CONFLICT,
                '密码错误',
            );
        }
        const access_token = this.jwtService.sign({
            _id: ifUser._id,
            username: ifUser.username,
        });
        return this.response.createResponse(
            Code.OK,
            '登录成功',
            {
                access_token
            }
        );
    }
    async register(
        username: string,
        password: string,
    ): Promise<Response<{ access_token: string }>> {
        let ifUser = await this.userModel.findOne({ username: username }).lean()
        if (ifUser) {
            return this.response.createResponse(
                Code.CONFLICT,
                '该用户已存在',
            );
        }
        let hash = CryptoJS.HmacSHA256(password, Key.jwtSecret).toString();
        let payload = {
            username,
            password: hash
        }
        let newUser = new this.userModel(payload)
        await newUser.save()
        return this.response.createResponse(
            Code.OK,
            '注册成功',
        );
    }
}
