import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Image {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  mimetype: string;
}

export default Image;
