import { Controller, Get } from '@nestjs/common';
import { createConnection } from 'typeorm';

import {
  seedPilots,
  seedShips,
  seedSources,
  seedUpgrades,
} from './modules/database/seeds';

@Controller()
export class AppController {
  @Get()
  public async root(): Promise<string> {
    // const conn = await createConnection({
    //   name: 'seeding',
    //   type: 'postgres',
    //   host: 'postgres',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'password',
    //   database: 'listbuilder',
    //   synchronize: true,
    //   logging: false,
    //   entities: ['src/**/*.entity{.ts,.js}']
    // });
    // // await seedShips(conn);
    // // await seedUpgrades(conn);
    // // await seedPilots(conn);
    // await seedSources(conn);
    return 'Hello World!';
  }
}
