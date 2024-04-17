import dev from './dev';
import pro from './pro';
import dev_mys from './dev_mys';
import pro_mys from './pro_mys';

const env = process.env.NODE_ENV;

let exportConfig = null;
switch (env) {
  case 'dev':
    exportConfig = dev;
    break;
  case 'pro':
    exportConfig = pro;
    break;
  case 'dev_mys':
    exportConfig = dev_mys;
    break;
  case 'pro_mys':
    exportConfig = pro_mys;
    break;
  default:
    exportConfig = dev;
    break;
}

export default exportConfig;
