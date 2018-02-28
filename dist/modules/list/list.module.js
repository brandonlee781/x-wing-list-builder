"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const source_module_1 = require("../source/source.module");
const list_resolver_1 = require("./list.resolver");
const list_service_1 = require("./list.service");
let ListModule = class ListModule {
};
ListModule = __decorate([
    common_1.Module({
        components: [
            list_service_1.ListService,
            list_resolver_1.ListResolver,
        ],
        imports: [
            source_module_1.SourceModule,
        ],
    })
], ListModule);
exports.ListModule = ListModule;
//# sourceMappingURL=list.module.js.map