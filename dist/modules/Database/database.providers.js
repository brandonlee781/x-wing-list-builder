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
const typeorm_1 = require("typeorm");
const constants_1 = require("../../constants");
exports.databaseProviders = [
    {
        provide: constants_1.DB_CONN_TOKEN,
        useFactory: () => __awaiter(this, void 0, void 0, function* () {
            return yield typeorm_1.createConnection({
                type: 'postgres',
                host: '127.0.0.1',
                port: 5432,
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_PASS,
                database: 'list_builder',
                synchronize: true,
                logging: false,
                entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            });
        }),
    },
];
//# sourceMappingURL=database.providers.js.map