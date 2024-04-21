import dev from './dev';
import pro from './pro';

const env = process.env.NODE_ENV;

let exportConfig = null;
switch (env) {
  case 'dev':
    exportConfig = dev;
    break;
  case 'pro':
    exportConfig = pro;
    break;
  default:
    exportConfig = dev;
    break;
}

export default exportConfig;
