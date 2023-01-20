/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesAuthController, CompaniesController, CompaniesForgotPasswordController, CompaniesResetPasswordController } from './companies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompanyEntity } from './models/companies.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CompanyEntity,
    ]),
  ],
  controllers: [CompaniesController, CompaniesAuthController, CompaniesForgotPasswordController, CompaniesResetPasswordController],
  providers: [CompaniesService]
})
export class CompaniesModule { }
