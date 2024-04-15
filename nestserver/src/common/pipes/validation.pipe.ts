// src/pipe/validation.pipe.ts
import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
// 管道库
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    //传入的数据 验证规则(元数据)

    if (!metatype || !this.toValidate(metatype)) {
      // 如果没有传入验证规则，则不验证，直接返回数据
      return value;
    }

    // 将对象转换为 Class 来验证
    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const error = Object.values(errors[0].constraints)[0]; // 只需要取第一个错误信息并返回即可
      // throw new BadRequestException(`Validation failed: ${msg}`);

      throw new HttpException(
        {
          error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    // 验证是否属于以下类型
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
