import { Controller, Get, Post, Body, Patch, Param, Delete, Headers } from '@nestjs/common';
import { PdiService } from './pdi.service';
import { PdiEntity } from './models/pdi.entity';
import { Authorization } from 'src/users/models/authorization.interface';

@Controller('myPDI')
export class MyPDIController {
  constructor(private readonly pdiService: PdiService) { }

  @Get()
  findAll(@Headers() headers: Authorization) {
    return this.pdiService.getMyPDI(headers.authorization);
  }
}

@Controller('teamPDI')
export class TeamPDIController {
  constructor(private readonly pdiService: PdiService) { }

  @Get()
  findAll(@Headers() headers: Authorization) {
    return this.pdiService.getMyTeamPDI(headers.authorization);
  }
}

@Controller('pdi')
export class PdiController {
  constructor(private readonly pdiService: PdiService) { }

  @Post()
  create(@Body() createPdiDto: PdiEntity, @Headers() headers: Authorization) {
    return this.pdiService.create(createPdiDto, headers.authorization);
  }

  @Get()
  findAll(@Headers() headers: Authorization) {
    return this.pdiService.findAll(headers.authorization);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Headers() headers: Authorization) {
    return this.pdiService.findOne(+id, headers.authorization);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePdiDto: PdiEntity, headers: Authorization) {
    return this.pdiService.update(+id, updatePdiDto, headers.authorization);
  }

  @Delete(':id')
  remove(@Param('id') id: string, headers: Authorization) {
    return this.pdiService.remove(+id, headers.authorization);
  }
}
