import { Injectable } from '@nestjs/common';
import { PdiEntity } from 'src/pdi/models/pdi.entity';

@Injectable()
export class PdiActionService {
  create(createPdiActionDto: PdiEntity, token: string) {
    return 'This action adds a new pdiAction';
  }

  findAll(token: string) {
    return `This action returns all pdiAction`;
  }

  findOne(id: number, token: string) {
    return `This action returns a #${id} pdiAction`;
  }

  update(id: number, updatePdiActionDto: PdiEntity, token: string) {
    return `This action updates a #${id} pdiAction`;
  }

  remove(id: number, token: string) {
    return `This action removes a #${id} pdiAction`;
  }
}
