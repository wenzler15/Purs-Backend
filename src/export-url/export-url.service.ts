import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExportUrlEntity } from './models/exportUrl.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/users/models/users.entity';

@Injectable()
export class ExportUrlService {
  constructor(
    @InjectRepository(ExportUrlEntity)
    private readonly exportUrl: Repository<ExportUrlEntity>,
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>,
  ) { }

  create(createExportUrlDto: any) {
    return 'This action adds a new exportUrl';
  }

  async findAll() {
    return 'This action adds a new exportUrl';
  }

  async findOne(id: string) {
    const link = await this.exportUrl.findOne({ where: { link: id } })

    const chart = await this.userEntity.query('SELECT u.name, u.email, u2.email as father, r."roleName" as title FROM "user" as u LEFT JOIN "user" as u2 ON u."idLeader" = u2.id INNER JOIN "role" as r on u."idRole" = r.id WHERE u."idCompany" = $1', [link.companyId]);

    chart.map((item) => {
      if (item.father === null) {
        item.father = ''
      }
    })

    return chart;
  }

  update(id: number, updateExportUrlDto: any) {
    return `This action updates a #${id} exportUrl`;
  }

  remove(id: number) {
    return `This action removes a #${id} exportUrl`;
  }
}
