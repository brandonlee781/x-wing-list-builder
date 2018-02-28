import { Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Source {

  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public xws: string;

  @Column()
  public name: string;

  @Column()
  public wave: number;

  @Column()
  public dataId: number;

  @Column({ nullable: true })
  public image: string;

  @Column({ nullable: true })
  public thumb: string;

  @Index()
  @Column({ nullable: true, type: 'jsonb' })
  public content: { ships: string[], pilots: string[], upgrades: string[] };

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: string;
}
