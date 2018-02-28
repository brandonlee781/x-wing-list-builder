// tslint:disable:object-literal-sort-keys
import dotenv from 'dotenv/config';
import { createConnection } from 'typeorm';
import { DB_CONN_TOKEN } from '../../constants';

export const databaseProviders = [
  {
    provide: DB_CONN_TOKEN,
    useFactory: async () =>
      await createConnection({
        type: 'postgres',
        host: '127.0.0.1',
        port: 5432,
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASS,
        database: 'list_builder',
        synchronize: true,
        logging: false,
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      }),
  },
];
