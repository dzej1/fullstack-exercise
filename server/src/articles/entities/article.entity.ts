import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Comment } from '../../comments/entities/comment.entity';
import { User } from '../../users/entities/user.entity';
import Image from '../../images/entities/image.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  userId: number;

  @ManyToOne(() => User, (user) => user.articles, { onDelete: 'CASCADE' })
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

  @OneToMany(() => Comment, (comment) => comment.article)
  comments: Comment[];

  @JoinColumn({ name: 'imageId' })
  @OneToOne(() => Image)
  public image: Image;

  @Column({ nullable: true })
  public imageId: number;
}
