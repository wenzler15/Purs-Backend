import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  UsersAuthController,
  UsersController,
  UsersForgotPasswordController,
  UsersResetPasswordController,
} from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './models/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [
    UsersController,
    UsersAuthController,
    UsersForgotPasswordController,
    UsersResetPasswordController,
  ],
  providers: [UsersService]
})
export class UsersModule { }
