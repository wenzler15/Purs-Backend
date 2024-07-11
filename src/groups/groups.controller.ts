import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { Group } from './models/group.interface';
import { Authorization } from 'src/users/models/authorization.interface';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
  create(@Headers() headers: Authorization, @Body() createGroupDto: Group) {
    return this.groupsService.create(createGroupDto, headers.authorization);
  }

  @Get()
  findAll(@Headers() headers: Authorization) {
    return this.groupsService.findAll(headers.authorization);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Headers() headers: Authorization) {
    return this.groupsService.findOne(+id, headers.authorization);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: Group, @Headers() headers: Authorization) {
    return this.groupsService.update(+id, updateGroupDto, headers.authorization);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Headers() headers: Authorization) {
    return this.groupsService.remove(+id, headers.authorization);
  }
}
