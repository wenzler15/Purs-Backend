import { Module } from '@nestjs/common';
import { LeadService } from './lead.service';
import { LeadAuthController, LeadController, leadEmailController } from './lead.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadEntity } from './models/lead.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LeadEntity])],
  controllers: [LeadController, LeadAuthController, leadEmailController],
  providers: [LeadService]
})
export class LeadModule {}
