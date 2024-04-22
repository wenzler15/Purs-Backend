import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionsTypeService } from './questions-type.service';
import { QuestionType } from './models/questions-type.interface';

@Controller('questions-type')
export class QuestionsTypeController {
  constructor(private readonly questionsTypeService: QuestionsTypeService) {}

  @Post()
  create(@Body() createQuestionsTypeDto: QuestionType) {
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
  update(@Param('id') id: string, @Body() updateQuestionsTypeDto: QuestionType) {
    return this.questionsTypeService.update(+id, updateQuestionsTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsTypeService.remove(+id);
  }
}
