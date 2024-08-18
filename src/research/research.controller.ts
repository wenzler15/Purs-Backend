import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResearchService } from './research.service';
import { Research } from './models/research.interface';

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

  @Get('getResearchs/:id')
  findAll(@Param('id') idCompany: string) {
    return this.researchService.findAll(+idCompany);
  }

  @Get('myResearchs/:id')
  myResearch(@Param('id') idUser: string) {
    return this.researchService.myResearch(+idUser);
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
