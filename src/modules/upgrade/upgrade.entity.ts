import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Upgrade {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column()
  public xws: string;

  @Column()
  public dataId: number;

  @Column()
  public slot: string;

  @Column()
  public text: string;

  @Column({ nullable: true })
  public image: string;

  @Column()
  public points: number;

  @Column({ nullable: true })
  public attack: number;

  @Column({ nullable: true })
  public range: string;

  @Column({ nullable: true })
  public energy: number;

  @Column({ nullable: true })
  public faction: string;

  @Column({ default: 'false' })
  public unique: boolean;

  @Column({ default: 'false' })
  public limited: boolean;

  @Column({ type: 'json', nullable: true })
  public grants: Array<{ type?: string; name?: string; value?: number }>;

  @Column({ nullable: true, type: 'simple-array' })
  public size: string[];

  @Column({ nullable: true, type: 'simple-array' })
  public ship: string[];
}
