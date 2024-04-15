import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';


@Module({
    // 用于引入字段表
    imports: [],
    // 用于引入控制器
    controllers: [UploadController],
    // 用于引入服务
    providers:[UploadService]
})
export class UploadModule {}
