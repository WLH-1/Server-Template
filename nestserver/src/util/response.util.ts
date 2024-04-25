import { Response } from 'src/common/interfaces/api.interface';
import { Injectable } from '@nestjs/common';

interface createResponse {
  <T>(code: number, msg: string, payload?: T): Response<T>;
}

@Injectable()
export class ResponseUtil {
  constructor() {}

  createResponse: createResponse = (code: number, msg: string, payload) => {
    let response = {
      code,
      msg,
    };
    if (payload) {
      response['payload'] = payload;
    }

    return response;
  };
}
