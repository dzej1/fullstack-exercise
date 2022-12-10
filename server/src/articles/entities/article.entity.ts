import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Comment } from '../../comments/entities/comment.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: true })
  userId: number;

  @ManyToOne(() => User, (user) => user.articles)
  @JoinColumn({ name: 'userId' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ length: 100 })
  title: string;

  @Column()
  perex: string;

  @Column({ nullable: true })
  content: string;

  @OneToMany(() => Comment, (comment) => comment.article, { cascade: true })
  comments: Comment[];
}
