import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from './models/role.entity';
import { CompaniesService } from 'src/companies/companies.service';
import { CompanyEntity } from 'src/companies/models/companies.entity';
import { UserEntity } from 'src/users/models/users.entity';
import { UsersService } from 'src/users/users.service';
import { ExportUrlEntity } from 'src/export-url/models/exportUrl.entity';
import { LeadEntity } from 'src/lead/models/lead.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, CompanyEntity, UserEntity, ExportUrlEntity, LeadEntity])],
  controllers: [RolesController],
  providers: [RolesService, CompaniesService, UsersService]
})
export class RolesModule { }
