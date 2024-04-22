import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionsAlternativesService } from './questions-alternatives.service';
import { QuestionAlternatives } from './models/questions-alternatives.interface';

@Controller('questions-alternatives')
export class QuestionsAlternativesController {
  constructor(private readonly questionsAlternativesService: QuestionsAlternativesService) {}

  @Post()
  create(@Body() createQuestionsAlternativeDto: QuestionAlternatives) {
    return this.questionsAlternativesService.create(createQuestionsAlternativeDto);
  }

  @Get('getAlternatives/:id')
  findAll(@Param('id') idQuestion: string) {
    return this.questionsAlternativesService.findAll(+idQuestion);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsAlternativesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionsAlternativeDto: QuestionAlternatives) {
    return this.questionsAlternativesService.update(+id, updateQuestionsAlternativeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsAlternativesService.remove(+id);
  }
}
