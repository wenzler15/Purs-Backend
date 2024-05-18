import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResearchResponseService } from './research-response.service';

@Controller('research-response')
export class ResearchResponseController {
  constructor(private readonly researchResponseService: ResearchResponseService) {}

  @Post()
  create(@Body() createResearchResponseDto: any) {
    return this.researchResponseService.create(createResearchResponseDto);
  }

  @Get(':userId/:researchId')
  findResponses(@Param('userId') userId: string, @Param('researchId') researchId: string) {
    return this.researchResponseService.findResponses(+userId, +researchId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResearchResponseDto: any) {
    return this.researchResponseService.update(+id, updateResearchResponseDto);
  }
}
