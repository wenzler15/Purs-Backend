import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { Question } from './models/questions.interface';
import { Authorization } from 'src/users/models/authorization.interface';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  create(@Body() createQuestionDto: Question) {
    return this.questionsService.create(createQuestionDto);
  }

  @Get('getQuestions/:id')
  findAll(@Param('id') idSection: string) {
    return this.questionsService.findAll(+idSection);
  }

  @Get('getQuestionsByResearch/:id')
  getQuestion(@Param('id') idResearch: string) {
    return this.questionsService.findAllQuestions(+idResearch);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionDto: Question) {
    return this.questionsService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(+id);
  }
}
