import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionsTypeService } from './questions-type.service';
import { CreateQuestionsTypeDto } from './dto/create-questions-type.dto';
import { UpdateQuestionsTypeDto } from './dto/update-questions-type.dto';

@Controller('questions-type')
export class QuestionsTypeController {
  constructor(private readonly questionsTypeService: QuestionsTypeService) {}

  @Post()
  create(@Body() createQuestionsTypeDto: CreateQuestionsTypeDto) {
    return this.questionsTypeService.create(createQuestionsTypeDto);
  }

  @Get()
  findAll() {
    return this.questionsTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionsTypeDto: UpdateQuestionsTypeDto) {
    return this.questionsTypeService.update(+id, updateQuestionsTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsTypeService.remove(+id);
  }
}
