/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { AuthEntity } from './models/auth.entity';
import { Company } from './models/companies.interface';
import { ForgotPasswordEntity } from './models/forgotPassword.entity';
import { ResetPasswordEntity } from './models/resetPassword.entity';

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) { }

  @Post()
  create(@Body() createCompanyDto: Company) {
    try {
      return this.companiesService.create(createCompanyDto);
    } catch (err) {
      throw new Error("Internal Server Error");
    }
  }

  @Get()
  findAll() {
    try {
      return this.companiesService.findAll();
    } catch (err) {
      throw new Error("Internal Server Error");
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.companiesService.findOne(+id);
    } catch (err) {
      throw new Error("Internal Server Error");
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: Company) {
    try {
      return this.companiesService.update(+id, updateCompanyDto);
    } catch (err) {
      throw new Error("Internal Server Error");
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    try {
      return this.companiesService.remove(+id);
    } catch (err) {
      throw new Error("Internal Server Error");
    }
  }
}

@Controller('companiesAuth')
export class CompaniesAuthController {
  constructor(private readonly companiesService: CompaniesService) { }

  @Post()
  auth(@Body() body: AuthEntity) {
    try {
      return this.companiesService.auth(body);
    } catch (err) {
      throw new Error("Internal Server Error");
    }
  }
}

@Controller('companiesForgotPassword')
export class CompaniesForgotPasswordController {
  constructor(private readonly companiesService: CompaniesService) { }

  @Post()
  forgotPassword(@Body() forgotPassword: ForgotPasswordEntity) {
    try {
      return this.companiesService.forgotPassword(forgotPassword)
    } catch (err) {
      throw new Error("Internal Server Error");
    }
  }
}

@Controller('companiesResetPassword')
export class CompaniesResetPasswordController {
  constructor(private readonly companiesService: CompaniesService) { }

  @Post()
  resetPassword(@Body() resetPassword: ResetPasswordEntity) {
    try {
      return this.companiesService.resetPassword(resetPassword);
    } catch (err) {
      throw new Error("Internal Server Error");
    }
  }
}