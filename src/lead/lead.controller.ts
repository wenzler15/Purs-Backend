import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LeadService } from './lead.service';
import { Lead } from './models/lead.interface';
import { AuthEntity } from 'src/companies/models/auth.entity';

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

@Controller('leadAuth')
export class LeadAuthController {
  constructor(private readonly leadService: LeadService) {}

  @Post()
  auth(@Body() body: AuthEntity) {
    try {
      return this.leadService.auth(body);
    } catch (err) {
      throw new Error("Internal Server Error");
    }
  }
}

@Controller('leadEmail')
export class leadEmailController {
  constructor(private readonly leadService: LeadService) {}

  @Post()
  sendEmail(@Body() body: any) {
    try {
      return this.leadService.sendEmail(body);
    } catch (err) {
      throw new Error("Internal Server Error");
    }
  }
}
