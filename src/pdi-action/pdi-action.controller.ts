import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PdiActionService } from './pdi-action.service';
import { CreatePdiActionDto } from './dto/create-pdi-action.dto';
import { UpdatePdiActionDto } from './dto/update-pdi-action.dto';

@Controller('pdi-action')
export class PdiActionController {
  constructor(private readonly pdiActionService: PdiActionService) {}

  @Post()
  create(@Body() createPdiActionDto: CreatePdiActionDto) {
    return this.pdiActionService.create(createPdiActionDto);
  }

  @Get()
  findAll() {
    return this.pdiActionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pdiActionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePdiActionDto: UpdatePdiActionDto) {
    return this.pdiActionService.update(+id, updatePdiActionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pdiActionService.remove(+id);
  }
}
