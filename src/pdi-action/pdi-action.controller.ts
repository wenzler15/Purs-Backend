import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { PdiActionService } from './pdi-action.service';
import { PdiEntity } from 'src/pdi/models/pdi.entity';
import { Authorization } from 'src/users/models/authorization.interface';

@Controller('pdi-action')
export class PdiActionController {
  constructor(private readonly pdiActionService: PdiActionService) { }

  @Post()
  create(@Body() createPdiActionDto: PdiEntity, @Headers() headers: Authorization) {
    return this.pdiActionService.create(createPdiActionDto, headers.authorization);
  }

  @Get()
  findAll(@Headers() headers: Authorization) {
    return this.pdiActionService.findAll(headers.authorization);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Headers() headers: Authorization) {
    return this.pdiActionService.findOne(+id, headers.authorization);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePdiActionDto: PdiEntity, @Headers() headers: Authorization) {
    return this.pdiActionService.update(+id, updatePdiActionDto, headers.authorization);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Headers() headers: Authorization) {
    return this.pdiActionService.remove(+id, headers.authorization);
  }
}
