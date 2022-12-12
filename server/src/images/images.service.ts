import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import Image from './entities/image.entity';

@Injectable()
export class ImagesService {
  constructor(
    @Inject('IMAGE_REPOSITORY')
    private imageRepository: Repository<Image>,
  ) {}

  async saveLocalFileData(fileData: Express.Multer.File) {
    const newFile = await this.imageRepository.create(fileData);
    await this.imageRepository.save(newFile);
    return newFile;
  }

  async getFileById(fileId: number) {
    const file = await this.imageRepository.findOne({ where: { id: fileId } });
    if (!file) {
      throw new NotFoundException();
    }
    return file;
  }
}
