import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { ResearchService } from './research.service';
import { Research } from './models/research.interface';
import { Authorization } from 'src/users/models/authorization.interface';

@Controller('research')
export class ResearchController {
  constructor(private readonly researchService: ResearchService) {}

  @Post()
  init(@Param('id') id: string, @Body() createResearchDto: Research) {
    return this.researchService.init(createResearchDto);
  }

  @Patch(':id')
  create(@Param('id') id: string, @Body() createResearchDto: Research) {
    return this.researchService.create(createResearchDto, +id);
  }

  @Get('duplicate/:id')
  duplicate(@Param('id') idResearch: string) {
    return this.researchService.duplicate(+idResearch);
  }

  @Get('getResearchs')
  findAll(@Headers() headers: Authorization) {
    return this.researchService.findAll(headers.authorization);
  }

  @Get('myResearchs')
  myResearch(@Headers() headers: Authorization) {
    return this.researchService.myResearch(headers.authorization);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.researchService.findOne(+id);
  }

  @Patch('updateInfo/:id')
  update(@Param('id') id: string, @Body() updateResearchDto: Research) {
    return this.researchService.update(+id, updateResearchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.researchService.remove(+id);
  }
}
