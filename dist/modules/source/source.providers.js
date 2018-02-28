"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../../constants");
const source_entity_1 = require("./source.entity");
exports.sourceProviders = [
    {
        inject: [constants_1.DB_CONN_TOKEN],
        provide: constants_1.SOURCE_REPO_TOKEN,
        useFactory: (connection) => connection.getRepository(source_entity_1.Source),
    },
];
//# sourceMappingURL=source.providers.js.map