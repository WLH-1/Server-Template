import { SetMetadata } from '@nestjs/common';

export const Public = () => SetMetadata('isPublic', true);
// 添加自定义元数据标记，表示此路由为公开接口

