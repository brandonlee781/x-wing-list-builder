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
const upgrade_entity_1 = require("../../../modules/upgrade/upgrade.entity");
const readFileAsync = util.promisify(fs.readFile);
exports.seedUpgrades = (conn) => __awaiter(this, void 0, void 0, function* () {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const upgradeFile = yield readFileAsync('node_modules/xwing-data/data/upgrades.js');
        const upgrades = JSON.parse(upgradeFile.toString());
        const upgradeRepository = conn.getRepository(upgrade_entity_1.Upgrade);
        upgrades.forEach((upgrade) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newUpgrade = new upgrade_entity_1.Upgrade();
                newUpgrade.name = upgrade.name;
                newUpgrade.xws = upgrade.xws;
                switch (upgrade.slot) {
                    case 'Astromech':
                        newUpgrade.slot = 'amd';
                        break;
                    case 'Bomb':
                        newUpgrade.slot = 'bomb';
                        break;
                    case 'Cannon':
                        newUpgrade.slot = 'cannon';
                        break;
                    case 'Cargo':
                        newUpgrade.slot = 'cargo';
                        break;
                    case 'Crew':
                        newUpgrade.slot = 'crew';
                        break;
                    case 'Elite':
                        newUpgrade.slot = 'ept';
                        break;
                    case 'Hardpoint':
                        newUpgrade.slot = 'hardpoint';
                        break;
                    case 'Illicit':
                        newUpgrade.slot = 'illicit';
                        break;
                    case 'Missile':
                        newUpgrade.slot = 'missile';
                        break;
                    case 'Modification':
                        newUpgrade.slot = 'mod';
                        break;
                    case 'Salvaged Astromech':
                        newUpgrade.slot = 'samd';
                        break;
                    case 'System':
                        newUpgrade.slot = 'system';
                        break;
                    case 'Team':
                        newUpgrade.slot = 'team';
                        break;
                    case 'Tech':
                        newUpgrade.slot = 'tech';
                        break;
                    case 'Title':
                        newUpgrade.slot = 'title';
                        break;
                    case 'Torpedo':
                        newUpgrade.slot = 'torpedo';
                        break;
                    case 'Turret':
                        newUpgrade.slot = 'turret';
                        break;
                }
                newUpgrade.text = upgrade.text;
                newUpgrade.image = upgrade.image;
                newUpgrade.points = upgrade.points;
                newUpgrade.attack = upgrade.attack;
                newUpgrade.range = upgrade.range;
                newUpgrade.energy = upgrade.energy;
                switch (upgrade.faction) {
                    case 'Rebel Alliance':
                    case 'Resistance':
                        newUpgrade.faction = 'rebel';
                        break;
                    case 'Galactic Empire':
                    case 'First Order':
                        newUpgrade.faction = 'imperial';
                        break;
                    case 'Scum and Villainy':
                        newUpgrade.faction = 'scum';
                        break;
                }
                newUpgrade.unique = upgrade.unique;
                newUpgrade.limited = upgrade.limited;
                newUpgrade.grants = upgrade.grants;
                newUpgrade.size = upgrade.size;
                newUpgrade.ship = upgrade.ship;
                newUpgrade.dataId = parseInt(upgrade.id, 10);
                yield upgradeRepository.save(newUpgrade);
            }
            catch (err) {
                reject(err); // tslint:disable-line
            }
        }));
        resolve(true);
    }));
});
//# sourceMappingURL=seed-upgrades.js.map