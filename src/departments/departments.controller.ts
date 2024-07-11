import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { Department } from './models/department.interface';
import { Authorization } from 'src/users/models/authorization.interface';

@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Post()
  create(@Body() createDepartmentDto: Department, @Headers() headers: Authorization) {
    return this.departmentsService.create(createDepartmentDto, headers.authorization);
  }

  @Get()
  findAll(@Headers() headers: Authorization) {
    return this.departmentsService.findAll(headers.authorization);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Headers() headers: Authorization) {
    return this.departmentsService.findOne(+id, headers.authorization);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDepartmentDto: Department, @Headers() headers: Authorization) {
    return this.departmentsService.update(+id, updateDepartmentDto, headers.authorization);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Headers() headers: Authorization) {
    return this.departmentsService.remove(+id, headers.authorization);
  }
}
