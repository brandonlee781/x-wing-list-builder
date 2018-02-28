"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const database_module_1 = require("../Database/database.module");
const source_providers_1 = require("./source.providers");
const source_resolver_1 = require("./source.resolver");
const source_service_1 = require("./source.service");
let SourceModule = class SourceModule {
};
SourceModule = __decorate([
    common_1.Module({
        components: [
            ...source_providers_1.sourceProviders,
            source_service_1.SourceService,
            source_resolver_1.SourceResolver,
        ],
        exports: [source_service_1.SourceService],
        imports: [database_module_1.DatabaseModule],
    })
], SourceModule);
exports.SourceModule = SourceModule;
//# sourceMappingURL=source.module.js.map