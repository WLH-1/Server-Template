import { IsNotEmpty } from 'class-validator';

export class UserDTO {
  // IsNotEmpty使用该装饰器后，在管道中间件中的async transform(value: any, { metatype }: ArgumentMetadata)
  // 将会抓取到改变量定义的字段类型与传入的变量字段类型判断，判断传入字段的类型是否合法
  @IsNotEmpty({ message: '角色名不能为空' })
  readonly name: string;
  @IsNotEmpty({ message: '账户不能为空' })
  readonly username: string;
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
}

export class UserQueryDTO {
  readonly name: string;
  readonly username: string;
}
