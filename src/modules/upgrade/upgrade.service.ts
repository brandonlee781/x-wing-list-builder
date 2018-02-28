import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

import { UPGRADE_REPO_TOKEN } from '../../constants';
import { Upgrade } from './upgrade.entity';

@Component()
export class UpgradeService {
  constructor(
    @Inject(UPGRADE_REPO_TOKEN) private readonly upgradeRepository: Repository<Upgrade>,
  ) {}

  public async findAll({ slot }: any): Promise<Upgrade[]> {
    const query = this.upgradeRepository.createQueryBuilder('upgrade');
    if (slot) {
      query.where('source.slot = :slot', {slot});
    }
    return await query.getMany();
  }
}
