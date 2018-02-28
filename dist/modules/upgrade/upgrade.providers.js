"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const upgrade_entity_1 = require("./upgrade.entity");
exports.upgradeProviders = [
    {
        inject: [constants_1.DB_CONN_TOKEN],
        provide: constants_1.UPGRADE_REPO_TOKEN,
        useFactory: (connection) => connection.getRepository(upgrade_entity_1.Upgrade),
    },
];
//# sourceMappingURL=upgrade.providers.js.map