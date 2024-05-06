import { IsNotEmpty } from 'class-validator';

export class LoginDTO {
  @IsNotEmpty({ message: '账号不能为空' })
  readonly username: string;
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
}

export class freeLoginDTO {
  @IsNotEmpty({ message: '账号不能为空' })
  readonly username: string;
}


export class RegistCanteenDTO {
  name: string;
  type: string;
  @IsNotEmpty({ message: '餐厅联系人不能为空' })
  contact: string;
  @IsNotEmpty({ message: '餐厅联系电话不能为空' })
  phone: string;
  @IsNotEmpty({ message: '餐厅地址不能为空' })
  address: string;
  postcode: string;
}
