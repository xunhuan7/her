import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export type UserRoleType = 'admin' | 'editor' | 'ghost';

@Entity()
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @Column({ default: 'https://event-img.geekpark.net/uploads/guest/avator/a2dc9530-ff8d-44ee-b91f-3091d0c48c3c/1574394933-L_%25E7%25BD%2597%25E6%25B0%25B8%25E6%25B5%25A9_%25E9%2594%25A4%25E5%25AD%2590%25E7%25A7%2591%25E6%258A%2580.jpg' })
  avatar: string;

  // markdown
  @Column({ default: '' })
  profile: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'editor', 'ghost'],
    default: ['editor'],
  })
  roles: UserRoleType;

  @Column({ default: true })
  limit: boolean;

  @Column()
  @CreateDateColumn()
  createAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

}
