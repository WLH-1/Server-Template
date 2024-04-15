import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { log } from 'console';
import { Request, Response, NextFunction } from 'express';


@Injectable()
export class InitMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    let { ip, headers, method, originalUrl, query } = request;
    if (headers && headers['x-real-ip']) {
      ip = (headers['x-real-ip'] as string).split(',')[0];
    }

    const userAgent = request.get('user-agent') || '';
    const now = Date.now();

    // 处理搜索关键字空格特殊符号等
    let escAddFun = (value) => {
      let valueSplit = value.split('');
      let valueSplitIndex = [];

      let containSpecial = RegExp(
        /[(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\-)(\_)(\+)(\=)(\[)(\])(\{)(\})(\|)(\\)(\;)(\:)(\')(\")(\,)(\.)(\/)(\)(\?)(\)]+/,
      );
      for (var i = 0; i < valueSplit.length; i++) {
        if (containSpecial.test(value[i])) {
          valueSplitIndex.push('\\' + valueSplit[i]);
        } else {
          valueSplitIndex.push(valueSplit[i]);
        }
      }

      let newValue = valueSplitIndex.join('');
      return newValue;
    };

    response.on('finish', async (res) => {
      const { body } = request;
      const logger = new Logger('HTTP');
      const { statusCode } = response;

      if (statusCode > 399) {
        logger.error(
          `${method} ${originalUrl} ${statusCode} - ${userAgent} ${ip} ${Date.now() - now
          }ms`,
        );
      } else {
        logger.log(
          `${method} ${originalUrl} ${statusCode} - ${userAgent} ${ip} ${Date.now() - now
          }ms`,
        );
      }
    });
    next();
  }
}
