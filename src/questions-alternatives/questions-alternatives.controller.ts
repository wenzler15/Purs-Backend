import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionsAlternativesService } from './questions-alternatives.service';
import { CreateQuestionsAlternativeDto } from './dto/create-questions-alternative.dto';
import { UpdateQuestionsAlternativeDto } from './dto/update-questions-alternative.dto';

@Controller('questions-alternatives')
export class QuestionsAlternativesController {
  constructor(private readonly questionsAlternativesService: QuestionsAlternativesService) {}

  @Post()
  create(@Body() createQuestionsAlternativeDto: CreateQuestionsAlternativeDto) {
    return this.questionsAlternativesService.create(createQuestionsAlternativeDto);
  }

  @Get()
  findAll() {
    return this.questionsAlternativesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsAlternativesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionsAlternativeDto: UpdateQuestionsAlternativeDto) {
    return this.questionsAlternativesService.update(+id, updateQuestionsAlternativeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsAlternativesService.remove(+id);
  }
}
