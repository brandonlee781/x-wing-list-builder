import { Module } from '@nestjs/common';
import { DatabaseModule } from '../Database/database.module';

import { upgradeProviders } from './upgrade.providers';
import { UpgradeResolver } from './upgrade.resolver';
import { UpgradeService } from './upgrade.service';

@Module({
  components: [
    ...upgradeProviders,
    UpgradeService,
    UpgradeResolver,
  ],
  imports: [DatabaseModule],
})
export class UpgradeModule {}
