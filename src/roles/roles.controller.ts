import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Role } from './models/role.interface';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Post()
  create(@Body() createRoleDto: Role) {
    try {
      return this.rolesService.create(createRoleDto);
    } catch (err) {
      throw new Error("Internal Server Error");
    }
  }

  @Get()
  findAll() {
    try {
      return this.rolesService.findAll();
    } catch (err) {
      throw new Error("Internal Server Error");
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.rolesService.findOne(+id);
    } catch (err) {
      throw new Error("Internal Server Error");
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: Role) {
    try {
      return this.rolesService.update(+id, updateRoleDto);
    } catch (err) {
      throw new Error("Internal Server Error");
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.rolesService.remove(+id);
    } catch (err) {
      throw new Error("Internal Server Error");
    }
  }
}
