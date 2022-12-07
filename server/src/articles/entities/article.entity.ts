import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column()
  perex: string;

  @Column({ nullable: true })
  content: string;

  @CreateDateColumn()
  createdAt: Date;
}
