"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const util = require("util");
const pilot_entity_1 = require("../../../modules/pilot/pilot.entity");
const ship_entity_1 = require("../../../modules/ship/ship.entity");
const readFileAsync = util.promisify(fs.readFile);
exports.seedPilots = (conn) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const pilotFiles = yield readFileAsync('node_modules/xwing-data/data/pilots.js');
        const pilots = JSON.parse(pilotFiles.toString());
        const shipRepository = conn.getRepository(ship_entity_1.Ship);
        pilots.forEach((pilot) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newPilot = new pilot_entity_1.Pilot();
                const ship = yield shipRepository
                    .createQueryBuilder('ship')
                    .where('ship.name = :name', { name: pilot.ship })
                    .getOne();
                newPilot.name = pilot.name;
                newPilot.unique = pilot.unique || false;
                newPilot.ship = ship;
                newPilot.skill = Number.isInteger(pilot.skill) ? pilot.skill : null;
                newPilot.points = Number.isInteger(pilot.points) ? pilot.points : null;
                newPilot.slots = pilot.slots.map((s) => {
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
                yield conn.manager.save(newPilot);
            }
            catch (err) {
                // tslint:disable-next-line
                reject(err);
            }
        }));
        resolve(true);
    }));
});
//# sourceMappingURL=seed-pilot.js.map