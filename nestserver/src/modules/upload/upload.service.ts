import { Injectable } from '@nestjs/common';
import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';


@Injectable()
export class UploadService {

    uploadFile(body, file) {
        var createStream = createWriteStream(join(__dirname, '../../', 'static/upload', `${file.originalname}`))
        createStream.write(file.buffer);
    }
    uploadFiles(body, files) {
        for (const file of files) {
            var createStream = createWriteStream(join(__dirname,'../../', 'static/upload', `${file.originalname}`))
            createStream.write(file.buffer);
        }
    }
}
