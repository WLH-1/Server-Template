import { IsNotEmpty } from 'class-validator';

export class StaffDTO {
  // IsNotEmpty使用该装饰器后，在管道中间件中的async transform(value: any, { metatype }: ArgumentMetadata)
  // 将会抓取到改变量定义的字段类型与传入的变量字段类型判断，判断传入字段的类型是否合法
  @IsNotEmpty({ message: '角色名不能为空' })
  readonly name: string;
  @IsNotEmpty({ message: '账户不能为空' })
  readonly username: string;
  @IsNotEmpty({ message: '密码不能为空' })
  password: string;
  @IsNotEmpty({ message: '联系方式不能为空' })
  readonly phone: string;
  readonly isActive: boolean;
  readonly roles: string[];
}

export class StaffQueryDTO {
  readonly name: string;
  readonly username: string;
  readonly phone: string;
  readonly role: string;
  readonly roleName: string;
  readonly isActive: string;
  readonly department: string;
  readonly search: string;
  readonly ifPages: string;
  readonly logicOperateAuths: string;
  readonly sortingCenter: string;
}

export class UpdateStaffDTO {
  @IsNotEmpty({ message: '员工名不能为空' })
  readonly name: string;
  @IsNotEmpty({ message: '联系方式不能为空' })
  readonly phone: string;
  readonly isActive: boolean;
  readonly roles: string[];
}
