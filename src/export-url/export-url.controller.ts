import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExportUrlService } from './export-url.service';

@Controller('export-url')
export class ExportUrlController {
  constructor(private readonly exportUrlService: ExportUrlService) { }

  @Post()
  create(@Body() createExportUrlDto: any) {
    return this.exportUrlService.create(createExportUrlDto);
  }

  @Get()
  findAll() {
    return this.exportUrlService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exportUrlService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExportUrlDto: any) {
    return this.exportUrlService.update(+id, updateExportUrlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exportUrlService.remove(+id);
  }
}
