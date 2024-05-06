import { Body, Controller, Get, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { UploadService } from './upload.service'
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) { }
    
    // 单个文件上传
    @Post()
    @UseInterceptors(FileInterceptor('pic'))
    uploadFile(
        @UploadedFile() file,
        @Body() body
    ) {
        return this.uploadService.uploadFile(body, file)
    }
    // 多个文件上传
    @Post()
    @UseInterceptors(FilesInterceptor(('pic')))
    uploadFiles(
        @UploadedFiles() files,
        @Body() body
    ) {
        return this.uploadService.uploadFiles(body, files)
    }
}
