import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { UsersService } from 'src/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/models/users.entity';
import { ExportUrlEntity } from 'src/export-url/models/exportUrl.entity';
import { LeadEntity } from 'src/lead/models/lead.entity';
import { CompanyEntity } from 'src/companies/models/companies.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ExportUrlEntity, LeadEntity, CompanyEntity]),
  ],
  controllers: [UploadsController],
  providers: [UploadsService, UsersService]
})
export class UploadsModule {}
