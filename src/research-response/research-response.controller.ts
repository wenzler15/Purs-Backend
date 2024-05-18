import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResearchResponseService } from './research-response.service';
import { ResearchResponse } from './models/research-response.interface';

@Controller('research-response')
export class ResearchResponseController {
  constructor(private readonly researchResponseService: ResearchResponseService) {}

  @Post()
  create(@Body() createResearchResponseDto: ResearchResponse[]) {    
    return this.researchResponseService.create(createResearchResponseDto);
  }

  @Get(':userId/:researchId')
  findResponses(@Param('userId') userId: string, @Param('researchId') researchId: string) {
    return this.researchResponseService.findResponses(+userId, +researchId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResearchResponseDto: ResearchResponse) {
    return this.researchResponseService.update(+id, updateResearchResponseDto);
  }

  @Get('verifyResearchs/:userId/:companyId')
  findSurveys(@Param('userId') userId: string, @Param('companyId') companyId: string) {
    return this.researchResponseService.findSurveys(+userId, +companyId);
  }
}
