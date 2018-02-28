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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let Upgrade = class Upgrade {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Upgrade.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Upgrade.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Upgrade.prototype, "xws", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Upgrade.prototype, "dataId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Upgrade.prototype, "slot", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Upgrade.prototype, "text", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Upgrade.prototype, "image", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Upgrade.prototype, "points", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Upgrade.prototype, "attack", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Upgrade.prototype, "range", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Upgrade.prototype, "energy", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Upgrade.prototype, "faction", void 0);
__decorate([
    typeorm_1.Column({ default: 'false' }),
    __metadata("design:type", Boolean)
], Upgrade.prototype, "unique", void 0);
__decorate([
    typeorm_1.Column({ default: 'false' }),
    __metadata("design:type", Boolean)
], Upgrade.prototype, "limited", void 0);
__decorate([
    typeorm_1.Column({ type: 'json', nullable: true }),
    __metadata("design:type", Array)
], Upgrade.prototype, "grants", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, array: true }),
    __metadata("design:type", String)
], Upgrade.prototype, "size", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, array: true }),
    __metadata("design:type", String)
], Upgrade.prototype, "ship", void 0);
Upgrade = __decorate([
    typeorm_1.Entity()
], Upgrade);
exports.Upgrade = Upgrade;
//# sourceMappingURL=upgrade.entity.js.map