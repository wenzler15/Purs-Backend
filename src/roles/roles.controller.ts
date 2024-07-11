import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { Role } from './models/role.interface';
import { RolesService } from './roles.service';
import { Authorization } from 'src/users/models/authorization.interface';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Post()
  create(@Body() createRoleDto: Role, @Headers() headers: Authorization) {
    try {
      return this.rolesService.create(createRoleDto, headers.authorization);
    } catch (err) {
      throw new Error("Internal Server Error");
    }
  }

  @Get()
  findAll(@Headers() headers: Authorization) {
    try {
      return this.rolesService.findAll(headers.authorization);
    } catch (err) {
      throw new Error("Internal Server Error");
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Headers() headers: Authorization) {
    try {
      return this.rolesService.findOne(+id, headers.authorization);
    } catch (err) {
      throw new Error("Internal Server Error");
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: Role, @Headers() headers: Authorization) {
    try {
      return this.rolesService.update(+id, updateRoleDto, headers.authorization);
    } catch (err) {
      throw new Error("Internal Server Error");
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Headers() headers: Authorization) {
    try {
      return this.rolesService.remove(+id, headers.authorization);
    } catch (err) {
      throw new Error("Internal Server Error");
    }
  }
}
