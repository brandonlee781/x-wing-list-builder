"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("@nestjs/graphql");
const lodash_1 = require("lodash");
const typeorm_1 = require("typeorm");
const source_entity_1 = require("../source/source.entity");
const source_service_1 = require("../source/source.service");
const searchSourceForUpgrades = (available, upgrades) => {
    const currUpgrades = [];
    // Search this source for any other upgrades the user might need
    for (const upgrade of upgrades) {
        if (available.indexOf(upgrade) >= 0) {
            currUpgrades.push(upgrade);
        }
    }
    return lodash_1.difference(upgrades, currUpgrades);
};
const getUpgradeSources = (upgrades, sources) => __awaiter(this, void 0, void 0, function* () {
    try {
        // Search for the source of the very first upgrade
        const upgradeQuery = yield typeorm_1.getRepository(source_entity_1.Source)
            .createQueryBuilder('source')
            .where(`source.content @> '{"upgrades": ["${upgrades[0]}"]}'`)
            .getOne();
        const availUpgrades = upgradeQuery.content.upgrades;
        upgrades = searchSourceForUpgrades(availUpgrades, upgrades);
        // if there are still upgrades with no sources, run this func again
        // go until all upgrades have sources
        if (upgrades.length >= 1) {
            return getUpgradeSources(upgrades, [upgradeQuery, ...sources]);
        }
        return sources.concat(upgradeQuery);
    }
    catch (err) {
        throw err;
    }
});
let ListResolver = class ListResolver {
    constructor(sourceService) {
        this.sourceService = sourceService;
    }
    getListSources(obj, args, context, info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const query = typeorm_1.getRepository(source_entity_1.Source).createQueryBuilder('source');
                const neededPilots = args.list.pilots.map(p => p.name);
                let neededUpgrades = [];
                args.list.pilots.map(p => p.upgrades)
                    .forEach(upgrade => {
                    const arr = Object.keys(upgrade)
                        .map(k => upgrade[k])
                        .reduce((a, b) => a.concat(b), []);
                    neededUpgrades = neededUpgrades.concat(arr);
                });
                const pilotQueries = neededPilots.map(p => query.where(`source.content @> '{"pilots": ["${p}"]}'`).getMany());
                const pilotSource = (yield Promise.all(pilotQueries)).reduce((a, b) => a.concat(b), []);
                // create an array of available upgrades the user would get with sources
                const availableUpgrades = pilotSource
                    .map(s => s.content.upgrades)
                    .reduce((a, b) => a.concat(b), []);
                neededUpgrades = searchSourceForUpgrades(availableUpgrades, neededUpgrades);
                const upgradeSources = yield getUpgradeSources(neededUpgrades, []);
                return [
                    ...pilotSource,
                    ...upgradeSources,
                ];
            }
            catch (err) {
                throw err;
            }
        });
    }
};
__decorate([
    graphql_1.Query('getListSources'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], ListResolver.prototype, "getListSources", null);
ListResolver = __decorate([
    graphql_1.Resolver('List'),
    __metadata("design:paramtypes", [source_service_1.SourceService])
], ListResolver);
exports.ListResolver = ListResolver;
//# sourceMappingURL=list.resolver.js.map