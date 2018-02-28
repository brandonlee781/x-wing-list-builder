import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Pilot } from '../pilot/pilot.entity';

@Entity()
export class Ship {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public xws: string;

  @Column({ array: true })
  public faction: string;

  @Column({ nullable: true })
  public dataId: number;

  @Column({ nullable: true })
  public attack: number;

  @Column()
  public agility: number;

  @Column()
  public hull: number;

  @Column()
  public shields: number;

  @Column({ array: true })
  public actions: string;

  @Column('jsonb')
  public maneuvers: string;

  @Column()
  public size: string;

  @Column({ array: true, name: 'firing_arcs', nullable: true })
  public firingArcs: string;

  @Column({ array: true, nullable: true })
  public dial: string;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: string;

  @OneToMany(type => Pilot, pilot => pilot.ship)
  public pilots: Pilot[];
}
