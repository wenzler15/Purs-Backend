import { Injectable } from '@nestjs/common';
import { CreatePdiActionDto } from './dto/create-pdi-action.dto';
import { UpdatePdiActionDto } from './dto/update-pdi-action.dto';

@Injectable()
export class PdiActionService {
  create(createPdiActionDto: CreatePdiActionDto) {
    return 'This action adds a new pdiAction';
  }

  findAll() {
    return `This action returns all pdiAction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pdiAction`;
  }

  update(id: number, updatePdiActionDto: UpdatePdiActionDto) {
    return `This action updates a #${id} pdiAction`;
  }

  remove(id: number) {
    return `This action removes a #${id} pdiAction`;
  }
}
