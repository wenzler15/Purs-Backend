import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { QuestionsSectionsService } from './questions-sections.service';
import { CreateQuestionsSectionDto } from './dto/create-questions-section.dto';
import { UpdateQuestionsSectionDto } from './dto/update-questions-section.dto';

@Controller('questions-sections')
export class QuestionsSectionsController {
  constructor(private readonly questionsSectionsService: QuestionsSectionsService) {}

  @Post()
  create(@Body() createQuestionsSectionDto: CreateQuestionsSectionDto) {
    return this.questionsSectionsService.create(createQuestionsSectionDto);
  }

  @Get()
  findAll() {
    return this.questionsSectionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsSectionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionsSectionDto: UpdateQuestionsSectionDto) {
    return this.questionsSectionsService.update(+id, updateQuestionsSectionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsSectionsService.remove(+id);
  }
}
