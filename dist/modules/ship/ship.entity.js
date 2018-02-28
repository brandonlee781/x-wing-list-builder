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
const pilot_entity_1 = require("../pilot/pilot.entity");
let Ship = class Ship {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], Ship.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Ship.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Ship.prototype, "xws", void 0);
__decorate([
    typeorm_1.Column({ array: true }),
    __metadata("design:type", String)
], Ship.prototype, "faction", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Ship.prototype, "dataId", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Ship.prototype, "attack", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Ship.prototype, "agility", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Ship.prototype, "hull", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Ship.prototype, "shields", void 0);
__decorate([
    typeorm_1.Column({ array: true }),
    __metadata("design:type", String)
], Ship.prototype, "actions", void 0);
__decorate([
    typeorm_1.Column('jsonb'),
    __metadata("design:type", String)
], Ship.prototype, "maneuvers", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Ship.prototype, "size", void 0);
__decorate([
    typeorm_1.Column({ array: true, name: 'firing_arcs', nullable: true }),
    __metadata("design:type", String)
], Ship.prototype, "firingArcs", void 0);
__decorate([
    typeorm_1.Column({ array: true, nullable: true }),
    __metadata("design:type", String)
], Ship.prototype, "dial", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ name: 'created_at' }),
    __metadata("design:type", String)
], Ship.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ name: 'updated_at' }),
    __metadata("design:type", String)
], Ship.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.OneToMany(type => pilot_entity_1.Pilot, pilot => pilot.ship),
    __metadata("design:type", Array)
], Ship.prototype, "pilots", void 0);
Ship = __decorate([
    typeorm_1.Entity()
], Ship);
exports.Ship = Ship;
//# sourceMappingURL=ship.entity.js.map