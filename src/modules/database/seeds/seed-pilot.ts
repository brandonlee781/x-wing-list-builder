import * as fs from 'fs';
import * as util from 'util';
import { Pilot } from '../../../modules/pilot/pilot.entity';
import { Ship } from '../../../modules/ship/ship.entity';

const readFileAsync = util.promisify(fs.readFile);

export const seedPilots = async conn => {
  return new Promise(async (resolve, reject) => {
    const pilotFiles = await readFileAsync('node_modules/xwing-data/data/pilots.js');
    const pilots = JSON.parse(pilotFiles.toString());
    const shipRepository = conn.getRepository(Ship);

    pilots.forEach(async (pilot: any) => {
      try {
        const newPilot = new Pilot();
        const ship = await shipRepository
          .createQueryBuilder('ship')
          .where('ship.name = :name', { name: pilot.ship })
          .getOne();

        newPilot.name = pilot.name;
        newPilot.unique = pilot.unique || false;
        newPilot.ship = ship;
        newPilot.skill = Number.isInteger(pilot.skill) ? pilot.skill : null;
        newPilot.points = Number.isInteger(pilot.points) ? pilot.points : null;
        newPilot.slots = pilot.slots.map((s: any) => {
          switch (s) {
            case 'Astromech':
              return 'amd';
            case 'Bomb':
              return 'bomb';
            case 'Cannon':
              return 'cannon';
            case 'Cargo':
              return 'cargo';
            case 'Crew':
              return 'crew';
            case 'Elite':
              return 'ept';
            case 'Hardpoint':
              return 'hardpoint';
            case 'Illicit':
              return 'illicit';
            case 'Missile':
              return 'missile';
            case 'Modification':
              return 'mod';
            case 'Salvaged Astromech':
              return 'samd';
            case 'System':
              return 'system';
            case 'Team':
              return 'team';
            case 'Tech':
              return 'tech';
            case 'Title':
              return 'title';
            case 'Torpedo':
              return 'torpedo';
            case 'Turret':
              return 'turret';
          }
        });

        newPilot.xws = pilot.xws;
        newPilot.dataId = pilot.id;

        switch (pilot.faction) {
          case 'Galactic Empire':
          case 'First Order':
            newPilot.faction = 'imperial';
            break;
          case 'Rebel Alliance':
          case 'Resistance':
            newPilot.faction = 'rebel';
            break;
          case 'Scum and Villainy':
            newPilot.faction = 'scum';
            break;
        }

        newPilot.text = pilot.text;
        newPilot.image = pilot.image || 'blank';

        await conn.manager.save(newPilot);
      } catch (err) {
        // tslint:disable-next-line
        reject(err);
      }
    });
    resolve(true);
  });
};
