import { Query, Resolver } from '@nestjs/graphql';
import { difference } from 'lodash';
import { getRepository } from 'typeorm';

import { List } from '../../../typings/list-juggler';
import { Pilot } from '../pilot/pilot.entity';
import { Source } from '../source/source.entity';
import { SourceService } from '../source/source.service';

interface ListArgs {
  list: List;
}

const searchSourceForUpgrades = (available, upgrades) => {
  const currUpgrades = [];
  // Search this source for any other upgrades the user might need
  for (const upgrade of upgrades) {
    if (available.indexOf(upgrade) >= 0) {
      currUpgrades.push(upgrade);
    }
  }
  return difference(upgrades, currUpgrades);
};

const getUpgradeSources = async (upgrades: string[], sources?: Source[]) => {
  try {
    // Search for the source of the very first upgrade
    const upgradeQuery = await getRepository(Source)
      .createQueryBuilder('source')
      .where(`source.content @> '{"upgrades": ["${upgrades[0]}"]}'`)
      .getOne();
    const availUpgrades = upgradeQuery.content.upgrades;
    upgrades = searchSourceForUpgrades(availUpgrades, upgrades);
    // if there are still upgrades with no sources, run this func again
    // go until all upgrades have sources
    if (upgrades.length >= 1) {
       return getUpgradeSources(upgrades, [ upgradeQuery, ...sources ]);
    }
    return sources.concat(upgradeQuery);
  } catch (err) {
    throw err;
  }
};

@Resolver('List')
export class ListResolver {
  constructor(
    private readonly sourceService: SourceService,
  ) {}

  @Query('getListSources')
  public async getListSources(obj: any, args: ListArgs, context: {}, info: any): Promise<Source[]> {
    try {
      const query = getRepository(Source).createQueryBuilder('source');

      const neededPilots: string[] = args.list.pilots.map(p => p.name);
      let neededUpgrades: string[] = [];
      args.list.pilots.map(p => p.upgrades)
        .forEach(upgrade => {
          const arr = Object.keys(upgrade)
            .map(k => upgrade[k])
            .reduce((a, b) => a.concat(b), []);
          neededUpgrades = neededUpgrades.concat(arr);
        });

      const pilotQueries = neededPilots.map(p => query.where(`source.content @> '{"pilots": ["${p}"]}'`).getMany());
      const pilotSource: Source[] = (await Promise.all(pilotQueries)).reduce((a, b) => a.concat(b), []);

      // create an array of available upgrades the user would get with sources
      const availableUpgrades: string[] = pilotSource
        .map(s => s.content.upgrades)
        .reduce((a, b) => a.concat(b), []);
      neededUpgrades = searchSourceForUpgrades(availableUpgrades, neededUpgrades);

      const upgradeSources = await getUpgradeSources(neededUpgrades, []);

      return [
        ...pilotSource,
        ...upgradeSources,
      ];
    } catch (err) {
      throw err;
    }
  }

}
