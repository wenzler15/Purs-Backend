import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionsSectionsService } from './questions-sections.service';
import { QuestionSections } from './models/questions-sections.interface';

@Controller('questions-sections')
export class QuestionsSectionsController {
  constructor(private readonly questionsSectionsService: QuestionsSectionsService) {}

  @Post()
  create(@Body() createQuestionsSectionDto: QuestionSections) {
    return this.questionsSectionsService.create(createQuestionsSectionDto);
  }

  @Get('getSections/:id')
  findAll(@Param('id') idResearch: string) {
    return this.questionsSectionsService.findAll(+idResearch);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsSectionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionsSectionDto: QuestionSections) {
    return this.questionsSectionsService.update(+id, updateQuestionsSectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsSectionsService.remove(+id);
  }
}
