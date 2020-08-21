import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: false })
  active: boolean;

  @Column()
  @Exclude()
  password: string;

  @Column()
  @Exclude()
  google_id: string;

  @Column()
  @Exclude()
  facebook_id: string;
}