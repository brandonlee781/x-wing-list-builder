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
const ship_entity_1 = require("../../../modules/ship/ship.entity");
const readFileAsync = util.promisify(fs.readFile);
exports.seedShips = (conn) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const shipFiles = yield readFileAsync('node_modules/xwing-data/data/ships.js');
        const ships = JSON.parse(shipFiles.toString());
        const shipRepository = conn.getRepository(ship_entity_1.Ship);
        ships.forEach((ship) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newShip = new ship_entity_1.Ship();
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
                yield conn.manager.save(newShip);
            }
            catch (err) {
                reject(err); // tslint:disable-line
            }
        }));
        resolve(true);
    }));
});
//# sourceMappingURL=seed-ship.js.map