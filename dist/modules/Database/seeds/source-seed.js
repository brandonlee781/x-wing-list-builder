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
const pilot_entity_1 = require("../../../modules/pilot/pilot.entity");
const ship_entity_1 = require("../../../modules/ship/ship.entity");
const source_entity_1 = require("../../../modules/source/source.entity");
const upgrade_entity_1 = require("../../../modules/upgrade/upgrade.entity");
const getData = (fileName, type) => new Promise((resolve, reject) => {
    fs.readFile(fileName, type, (err, data) => {
        // if has error reject, otherwise resolve
        return err ? reject(err) : resolve(data);
    });
});
function fillArray(value, len) {
    const arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(value);
    }
    return arr;
}
exports.seedSources = (conn) => __awaiter(this, void 0, void 0, function* () {
    const sourceRepository = conn.getRepository(source_entity_1.Source);
    const pilotRepository = conn.getRepository(pilot_entity_1.Pilot);
    const shipRepository = conn.getRepository(ship_entity_1.Ship);
    const upgradeRepository = conn.getRepository(upgrade_entity_1.Upgrade);
    const sourceFile = yield getData('node_modules/xwing-data/data/sources.js', 'utf8');
    const upgradeFile = yield getData('node_modules/xwing-data/data/upgrades.js', 'utf8');
    const pilotFile = yield getData('node_modules/xwing-data/data/pilots.js', 'utf8');
    const shipFile = yield getData('node_modules/xwing-data/data/ships.js', 'utf8');
    const sourcesData = JSON.parse(sourceFile.toString());
    const upgradesData = JSON.parse(upgradeFile.toString());
    const pilotsData = JSON.parse(pilotFile.toString());
    const shipsData = JSON.parse(shipFile.toString());
    sourcesData.forEach((source) => __awaiter(this, void 0, void 0, function* () {
        const newExp = new source_entity_1.Source();
        newExp.dataId = source.id;
        newExp.name = source.name;
        newExp.xws = source.sku.toLowerCase();
        newExp.image = source.image;
        newExp.thumb = source.thumb;
        newExp.wave = Number.isInteger(source.wave) ? source.wave : 0;
        const expPilotIds = Object.keys(source.contents.pilots).map((id) => {
            const len = parseInt(source.contents.pilots[id], 10);
            return fillArray(id, len);
        }).reduce((a, b) => a.concat(b));
        const expPilotQueries = expPilotIds.map((id) => {
            return pilotRepository
                .createQueryBuilder('pilot')
                .where('pilot.dataId = :id', { id })
                .getOne();
        });
        const expPilots = yield Promise.all(expPilotQueries);
        const expShipIds = Object.keys(source.contents.ships).map((id) => {
            const len = parseInt(source.contents.ships[id], 10);
            return fillArray(id, len);
        }).reduce((a, b) => a.concat(b));
        const expShipQueries = expShipIds.map((id) => {
            return shipRepository
                .createQueryBuilder('ship')
                .where('ship.dataId = :id', { id })
                .getOne();
        });
        const expShips = yield Promise.all(expShipQueries);
        const expUpgradeIds = Object.keys(source.contents.upgrades).map((id) => {
            const len = parseInt(source.contents.upgrades[id], 10);
            return fillArray(id, len);
        }).reduce((a, b) => a.concat(b));
        const expUpgradeQueries = expUpgradeIds.map((id) => {
            return upgradeRepository
                .createQueryBuilder('upgrade')
                .where('upgrade.dataId = :id', { id })
                .getOne();
        });
        const expUpgrades = yield Promise.all(expUpgradeQueries);
        newExp.content = {
            pilots: expPilots.map(pilot => pilot.xws),
            ships: expShips.map(ship => ship.xws),
            upgrades: expUpgrades.map(upgrade => upgrade.xws),
        };
        yield sourceRepository.save(newExp);
    }));
});
//# sourceMappingURL=source-seed.js.map