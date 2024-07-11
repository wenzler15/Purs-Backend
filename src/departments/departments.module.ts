import { Module } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { DepartmentsController } from './departments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartmentEntity } from './models/department.entity';
import { CompanyEntity } from 'src/companies/models/companies.entity';
import { UserEntity } from 'src/users/models/users.entity';
import { ExportUrlEntity } from 'src/export-url/models/exportUrl.entity';
import { LeadEntity } from 'src/lead/models/lead.entity';
import { CompaniesService } from 'src/companies/companies.service';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([DepartmentEntity, CompanyEntity, UserEntity, ExportUrlEntity, LeadEntity])],
  controllers: [DepartmentsController],
  providers: [DepartmentsService, CompaniesService, UsersService]
})
export class DepartmentsModule {}
