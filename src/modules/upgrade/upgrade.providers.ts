import { Connection } from 'typeorm';

import { DB_CONN_TOKEN, UPGRADE_REPO_TOKEN } from '../../constants';
import { Upgrade } from './upgrade.entity';

export const upgradeProviders = [
  {
    inject: [DB_CONN_TOKEN],
    provide: UPGRADE_REPO_TOKEN,
    useFactory: (connection: Connection) => connection.getRepository(Upgrade),
  },
];
