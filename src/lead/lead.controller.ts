import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LeadService } from './lead.service';
import { Lead } from './models/lead.interface';

@Controller('lead')
export class LeadController {
  constructor(private readonly leadService: LeadService) {}

  @Post()
  create(@Body() createLeadDto: Lead) {
    return this.leadService.create(createLeadDto);
  }

  @Get()
  findAll() {
    return this.leadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.leadService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.leadService.remove(+id);
  }
}
