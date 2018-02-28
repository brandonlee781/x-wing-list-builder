import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { Ship } from '../ship/ship.entity';

@Entity()
export class Pilot {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public xws: string;

  @Column()
  public dataId: number;

  // @Column({ type: 'uuid' })
  // public ship: string;

  @Column()
  public unique: boolean;

  @Column({ nullable: true })
  public skill: number;

  @Column({ nullable: true })
  public points: number;

  @Column({ array: true })
  public slots: string;

  @Column()
  public faction: string;

  @Column({ nullable: true })
  public text: string;

  @Column({ nullable: true })
  public image: string;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: string;

  @ManyToOne(type => Ship, ship => ship.pilots)
  public ship: Ship;
}
