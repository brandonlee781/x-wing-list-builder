import * as fs from 'fs';
import { Connection, Repository } from 'typeorm';

import { Pilot } from '../../../modules/pilot/pilot.entity';
import { Ship } from '../../../modules/ship/ship.entity';
import { Source } from '../../../modules/source/source.entity';
import { Upgrade } from '../../../modules/upgrade/upgrade.entity';
import { SourceData } from './dataInterfaces';

const getData = (fileName: string, type: string) =>
  new Promise((resolve, reject) => {
    fs.readFile(fileName, type, (err, data) => {
      // if has error reject, otherwise resolve
      return err ? reject(err) : resolve(data);
    });
  });
function fillArray(value: string, len: number) {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(value);
  }
  return arr;
}

export const seedSources = async (conn: Connection) => {
  const sourceRepository: Repository<Source> = conn.getRepository(Source);
  const pilotRepository: Repository<Pilot> = conn.getRepository(Pilot);
  const shipRepository: Repository<Ship> = conn.getRepository(Ship);
  const upgradeRepository: Repository<Upgrade> = conn.getRepository(Upgrade);

  const sourceFile = await getData('node_modules/xwing-data/data/sources.js', 'utf8');
  const upgradeFile = await getData('node_modules/xwing-data/data/upgrades.js', 'utf8');
  const pilotFile = await getData('node_modules/xwing-data/data/pilots.js', 'utf8');
  const shipFile = await getData('node_modules/xwing-data/data/ships.js', 'utf8');

  const sourcesData: SourceData[] = JSON.parse(sourceFile.toString());
  const upgradesData: Upgrade[] = JSON.parse(upgradeFile.toString());
  const pilotsData: Pilot[] = JSON.parse(pilotFile.toString());
  const shipsData: Ship[] = JSON.parse(shipFile.toString());

  sourcesData.forEach(async (source: SourceData) => {
    const newExp: Source = new Source();

    newExp.dataId = source.id;
    newExp.name = source.name;
    newExp.xws = source.sku.toLowerCase();
    newExp.image = source.image;
    newExp.thumb = source.thumb;
    newExp.wave = Number.isInteger(source.wave) ? source.wave : 0;

    const expPilotIds: string[] = Object.keys(source.contents.pilots).map((id: string) => {
      const len = parseInt(source.contents.pilots[id], 10);
      return fillArray(id, len);
    }).reduce((a, b) => a.concat(b));
    const expPilotQueries: Array<Promise<Pilot>> = expPilotIds.map((id: string) => {
      return pilotRepository
        .createQueryBuilder('pilot')
        .where('pilot.dataId = :id', {id})
        .getOne();
    });
    const expPilots: Pilot[] = await Promise.all(expPilotQueries);

    const expShipIds: string[] = Object.keys(source.contents.ships).map((id: string) => {
      const len = parseInt(source.contents.ships[id], 10);
      return fillArray(id, len);
    }).reduce((a, b) => a.concat(b));
    const expShipQueries: Array<Promise<Ship>> = expShipIds.map((id: string) => {
      return shipRepository
        .createQueryBuilder('ship')
        .where('ship.dataId = :id', {id})
        .getOne();
    });
    const expShips: Ship[] = await Promise.all(expShipQueries);

    const expUpgradeIds: string[] = Object.keys(source.contents.upgrades).map((id: string) => {
      const len = parseInt(source.contents.upgrades[id], 10);
      return fillArray(id, len);
    }).reduce((a, b) => a.concat(b));
    const expUpgradeQueries: Array<Promise<Upgrade>> = expUpgradeIds.map((id: string) => {
      return upgradeRepository
        .createQueryBuilder('upgrade')
        .where('upgrade.dataId = :id', {id})
        .getOne();
    });
    const expUpgrades: Upgrade[] = await Promise.all(expUpgradeQueries);

    newExp.content = {
      pilots: expPilots.map(pilot => pilot.xws),
      ships: expShips.map(ship => ship.xws),
      upgrades: expUpgrades.map(upgrade => upgrade.xws),
    };

    await sourceRepository.save(newExp);

  });
};
