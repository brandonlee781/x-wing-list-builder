import * as fs from 'fs';
import * as util from 'util';
import { Ship } from '../../../modules/ship/ship.entity';

const readFileAsync = util.promisify(fs.readFile);

export const seedShips = async conn => {
  return new Promise(async (resolve, reject) => {
    const shipFiles = await readFileAsync('node_modules/xwing-data/data/ships.js');
    const ships = JSON.parse(shipFiles.toString());
    const shipRepository = conn.getRepository(Ship);

    ships.forEach(async ship => {
      try {
        const newShip = new Ship();
        newShip.name = ship.name;
        newShip.xws = ship.xws;
        newShip.dataId = ship.id;
        newShip.attack = ship.attack;
        newShip.agility = ship.agility;
        newShip.hull = ship.hull;
        newShip.shields = ship.shields;
        newShip.actions = ship.actions;
        newShip.maneuvers = ship.maneuvers;
        newShip.size = ship.size;
        newShip.firingArcs = ship.firing_arcs;
        newShip.dial = ship.dial;

        newShip.faction = ship.faction.map(faction => {
          switch (faction) {
            case 'Galactic Empire':
            case 'First Order':
              return 'imperial';
            case 'Rebel Alliance':
            case 'Resistance':
              return 'rebel';
            case 'Scum and Villainy':
              return 'scum';
          }
        });

        await conn.manager.save(newShip);
      } catch (err) {
        reject(err) // tslint:disable-line
      }
    });
    resolve(true);
  });
};
