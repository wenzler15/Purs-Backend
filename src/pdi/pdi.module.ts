import { Module } from '@nestjs/common';
import { PdiService } from './pdi.service';
import { MyPDIController, PdiController, TeamPDIController } from './pdi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PdiEntity } from './models/pdi.entity';
import { UserEntity } from 'src/users/models/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PdiEntity, UserEntity])],
  controllers: [PdiController, TeamPDIController, MyPDIController],
  providers: [PdiService]
})
export class PdiModule { }
