import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;
  
  @Column({default: false})
  active: boolean;
}