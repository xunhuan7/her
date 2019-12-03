import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Blog extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 200 })
  email: string;

  @Column('text')
  password: string;

  @Column()
  nickname: string;

  @Column({ length: 200 })
  avatar: string;

  @Column({ default: false })
  isActive: boolean;
}
