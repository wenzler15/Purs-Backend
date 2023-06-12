import { Module } from '@nestjs/common';
import { PdiActionService } from './pdi-action.service';
import { PdiActionController } from './pdi-action.controller';

@Module({
  controllers: [PdiActionController],
  providers: [PdiActionService]
})
export class PdiActionModule {}
