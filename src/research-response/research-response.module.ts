import { Module } from '@nestjs/common';
import { ResearchResponseService } from './research-response.service';
import { ResearchResponseController } from './research-response.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResearchResponseEntity } from './models/research-response.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ResearchResponseEntity,
    ]),
  ],
  controllers: [ResearchResponseController],
  providers: [ResearchResponseService]
})
export class ResearchResponseModule {}
