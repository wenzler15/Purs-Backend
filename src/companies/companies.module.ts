/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesAuthController, CompaniesController, CompaniesForgotPasswordController, CompaniesResetPasswordController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from './models/companies.entity';
import { UserEntity } from 'src/users/models/users.entity';
import { UsersService } from 'src/users/users.service';
import { ExportUrlEntity } from 'src/export-url/models/exportUrl.entity';
import { LeadEntity } from 'src/lead/models/lead.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanyEntity,
      UserEntity,
      ExportUrlEntity,
      LeadEntity
    ]),
  ],
  controllers: [CompaniesController, CompaniesAuthController, CompaniesForgotPasswordController, CompaniesResetPasswordController],
  providers: [CompaniesService, UsersService]
})
export class CompaniesModule { }
