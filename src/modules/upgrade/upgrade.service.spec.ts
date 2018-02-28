import { Test } from '@nestjs/testing';
import { createConnection, Repository } from 'typeorm';

import { DatabaseModule } from '../Database/database.module';
import { Upgrade } from './upgrade.entity';
import { upgradeProviders } from './upgrade.providers';
import { UpgradeResolver } from './upgrade.resolver';
import { UpgradeService } from './upgrade.service';

describe('UpgradeService', () => {
  let upgradeService: UpgradeService;
  let results: Upgrade[];

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      components: [...upgradeProviders, UpgradeService, UpgradeResolver],
      imports: [DatabaseModule],
    }).compile();

    upgradeService = await module.get<UpgradeService>(UpgradeService);
    results = [
      {
        id: '005163fb-c8d1-4499-ab8f-ef14ebb76960',
        xws: 'suppressor',
        name: 'Suppressor',
        slot: 'title',
        text: `Once per round, after you acquire a target lock on an enemy ship,
              you may remove 1 focus, evade, or blue target lock token from that ship.`,
        points: 6,
        attack: null,
        range: null,
        energy: 2,
        faction: null,
        unique: true,
        limited: false,
        size: null,
        ship: ['Gozanti-class Cruiser'],
        image: 'upgrades/Title/suppressor.png',
        grants: null,
        dataId: 228,
      },
      {
        id: '00d14fe8-3199-48d5-b696-d0dd86d7f726',
        xws: 'munitionsfailsafe',
        name: 'Munitions Failsafe',
        slot: 'mod',
        text: `When attacking with a secondary weapon that instructs you to discard it to perform the attack,
              do not discard it unless the attack hits.`,
        points: 1,
        attack: null,
        range: null,
        energy: null,
        faction: null,
        unique: false,
        limited: false,
        size: null,
        ship: null,
        image: 'upgrades/Modification/munitions-failsafe.png',
        grants: null,
        dataId: 180,
      },
      {
        id: '02805e17-02f3-4fca-83d0-be14a4242557',
        xws: 'countermeasures',
        name: 'Countermeasures',
        slot: 'mod',
        text: `At the start of the Combat phase, you may discard this card to increase your
              agility value by 1 until the end of the round. Then you may remove 1 enemy target lock from your ship.`,
        points: 3,
        attack: null,
        range: null,
        energy: null,
        faction: null,
        unique: false,
        limited: false,
        size: ['large'],
        ship: null,
        image: 'upgrades/Modification/countermeasures.png',
        grants: null,
        dataId: 186,
      },
    ];
  });

  describe('findAll', () => {
    it('should return an array of upgrades', async () => {
      jest.spyOn(upgradeService, 'findAll').mockImplementation(() => results);

      expect(await upgradeService.findAll({})).toBe(results);
    });

    it('should return only upgrades of the passed slot', async () => {
      jest
        .spyOn(upgradeService, 'findAll')
        .mockImplementation(obj => results.filter(r => r.slot === obj.slot));

      expect(await upgradeService.findAll({ slot: 'mod' })).toEqual([
        results[1],
        results[2],
      ]);
    });
  });
});
