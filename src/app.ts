import Logger from './domain/logger';
import {port} from './config/config';
import routes from './http/routes';

routes.listen(port, () => {
    Logger.info(`server running on port : ${port}`);
}).on('error', (e) => Logger.error(e));
