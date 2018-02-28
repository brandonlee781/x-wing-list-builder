import { Query, Resolver } from '@nestjs/graphql';

import { Upgrade } from './upgrade.entity';
import { UpgradeService } from './upgrade.service';

interface UpgradeArgs {
  slot: string;
}

@Resolver('Upgrade')
export class UpgradeResolver {
  constructor(
    private readonly upgradeService: UpgradeService,
  ) {}

  @Query('allUpgrades')
  public async allUpgrades(obj: any, args: UpgradeArgs, context: {}, info: any): Promise<Upgrade[]> {
    return await this.upgradeService.findAll(args);
  }
}
