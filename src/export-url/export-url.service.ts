import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExportUrlEntity } from './models/exportUrl.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExportUrlService {
  constructor(
    @InjectRepository(ExportUrlEntity)
    private readonly exportUrl: Repository<ExportUrlEntity>,
  ) { }

  create(createExportUrlDto: any) {
    return 'This action adds a new exportUrl';
  }

  findAll() {
    return `This action returns all exportUrl`;
  }

  async findOne(id: number) {
    const link = await this.exportUrl.findOne({ where: { id } })

    link.id = undefined;
    link.createdAt = undefined;

    return { link: link.link };
  }

  update(id: number, updateExportUrlDto: any) {
    return `This action updates a #${id} exportUrl`;
  }

  remove(id: number) {
    return `This action removes a #${id} exportUrl`;
  }
}
