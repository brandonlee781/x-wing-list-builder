import { Test } from '@nestjs/testing';
import { createConnection, Repository } from 'typeorm';

import { DatabaseModule } from '../Database/database.module';
import { Source } from './source.entity';
import { sourceProviders } from './source.providers';
import { SourceResolver } from './source.resolver';
import { SourceService } from './source.service';

describe('SourceService', () => {
  let sourceService: SourceService;
  let results: Source[];

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      components: [...sourceProviders, SourceService, SourceResolver],
      imports: [DatabaseModule],
    }).compile();

    sourceService = await module.get<SourceService>(SourceService);
    results = [
      {
        id: '03b0a3ea-378a-4742-acbb-00d933a92a56',
        xws: 'swx06',
        name: 'Millennium Falcon Expansion Pack',
        wave: 2,
        dataId: 7,
        image: 'sources/millennium-falcon-expansion-pack-product.png',
        thumb: 'sources/millennium-falcon-expansion-pack-thumb.jpg',
        content: {
          ships: ['yt1300'],
          pilots: [
            'outerrimsmuggler',
            'chewbacca',
            'landocalrissian',
            'hansolo',
          ],
          upgrades: [
            'concussionmissiles',
            'elusiveness',
            'assaultmissiles',
            'veteraninstincts',
            'weaponsengineer',
            'drawtheirfire',
            'lukeskywalker',
            'niennunb',
            'chewbacca',
            'millenniumfalcon',
            'shieldupgrade',
            'shieldupgrade',
            'engineupgrade',
            'engineupgrade',
          ],
        },
        createdAt: 'Thu Feb 22 2018 22:33:56 GMT-0600 (CST)',
        updatedAt: 'Thu Feb 22 2018 22:33:56 GMT-0600 (CST)',
      },
      {
        id: '83a8bc22-5b10-46c2-b5e9-a0653c5d8152',
        xws: 'swx07',
        name: 'Slave I Expansion Pack',
        wave: 2,
        dataId: 8,
        image: 'sources/slave-i-expansion-pack-product.png',
        thumb: 'sources/slave-i-expansion-pack-thumb.jpg',
        content: {
          ships: ['firespray31'],
          pilots: [
            'kathscarlet',
            'bobafett',
            'krassistrelix',
            'bountyhunter',
          ],
          upgrades: [
            'homingmissiles',
            'expose',
            'gunner',
            'ioncannon',
            'heavylasercannon',
            'seismiccharges',
            'mercenarycopilot',
            'assaultmissiles',
            'veteraninstincts',
            'proximitymines',
            'slavei',
            'stealthdevice',
            'stealthdevice',
          ],
        },
        createdAt: 'Thu Feb 22 2018 22:33:56 GMT-0600 (CST)',
        updatedAt: 'Thu Feb 22 2018 22:33:56 GMT-0600 (CST)',
      },
      {
        id: '03bff192-3f9c-4940-ad28-db8493d67b13',
        xws: 'swx63',
        name: 'TIE Striker Expansion Pack',
        wave: 10,
        dataId: 50,
        image: 'sources/swx63-product.png',
        thumb: 'sources/swx63-thumb.png',
        content: {
          ships: ['tiestriker'],
          pilots: [
            'duchess',
            'countdown',
            'puresabacc',
            'imperialtrainee',
            'blacksquadronscout',
            'scarifdefender',
          ],
          upgrades: ['adaptiveailerons', 'swarmleader', 'lightweightframe'],
        },
        createdAt: 'Thu Feb 22 2018 22:33:57 GMT-0600 (CST)',
        updatedAt: 'Thu Feb 22 2018 22:33:57 GMT-0600 (CST)',
      },
    ];
  });

  describe('findAll', () => {
    it('should return an array of sources', async () => {
      jest.spyOn(sourceService, 'findAll').mockImplementation(() => results);

      expect(await sourceService.findAll({})).toBe(results);
    });

    it('should return only sources of the passed wave', async () => {
      jest
        .spyOn(sourceService, 'findAll')
        .mockImplementation(obj => results.filter(r => r.wave === obj.wave));

      expect(await sourceService.findAll({ wave: 2 })).toEqual([
        results[0],
        results[1],
      ]);
    });
  });

  describe('findOne', () => {
    it('should return a single source', async () => {
      jest
        .spyOn(sourceService, 'findOne')
        .mockImplementation(xws => results.filter(r => r.xws === xws)[0]);

      expect(await sourceService.findOne('swx06')).toBe(results[0]);
    });
  });
});
