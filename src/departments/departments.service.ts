import { Injectable } from '@nestjs/common';
import { Department } from './models/department.interface';

@Injectable()
export class DepartmentsService {
  create(createDepartmentDto: Department) {
    return 'This action adds a new department';
  }

  findAll() {
    return `This action returns all departments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} department`;
  }

  update(id: number, updateDepartmentDto: Department) {
    return `This action updates a #${id} department`;
  }

  remove(id: number) {
    return `This action removes a #${id} department`;
  }
}
