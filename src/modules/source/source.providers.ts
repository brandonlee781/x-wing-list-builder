import { Connection } from 'typeorm';

import { DB_CONN_TOKEN, SOURCE_REPO_TOKEN } from '../../constants';
import { Source } from './source.entity';

export const sourceProviders = [
  {
    inject: [DB_CONN_TOKEN],
    provide: SOURCE_REPO_TOKEN,
    useFactory: (connection: Connection) => connection.getRepository(Source),
  },
];
