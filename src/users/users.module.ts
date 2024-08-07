import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  UserLeaderController,
  UsersAuthController,
  UsersController,
  UsersCreateURLOrgController,
  UsersForgotPasswordController,
  UsersResetPasswordController,
} from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/users.entity';
import { ExportUrlEntity } from 'src/export-url/models/exportUrl.entity';
import { LeadEntity } from 'src/lead/models/lead.entity';
import { CompanyEntity } from 'src/companies/models/companies.entity';
import { RoleEntity } from 'src/roles/models/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, ExportUrlEntity, LeadEntity, CompanyEntity, RoleEntity]),
  ],
  controllers: [
    UsersController,
    UsersAuthController,
    UsersForgotPasswordController,
    UsersResetPasswordController,
    UserLeaderController,
    UsersCreateURLOrgController
  ],
  providers: [UsersService]
})
export class UsersModule { }
