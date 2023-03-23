/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthEntity } from 'src/companies/models/auth.entity';
import { ForgotPasswordEntity } from 'src/companies/models/forgotPassword.entity';
import { ResetPasswordEntity } from 'src/companies/models/resetPassword.entity';
import { User } from './models/users.interface';
import { UsersService } from './users.service';
import { Headers } from "@nestjs/common";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: User) {
    try {
      return this.usersService.create(createUserDto);
    } catch (err) {
      throw new Error("Internal Server Error");
    }
  }

  @Get()
  findAll() {
    try {
      return this.usersService.findAll();
    } catch (err) {
      throw new Error("Internal Server Error");
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    try {
      return this.usersService.findOne(+id);
    } catch (err) {
      throw new Error("Internal Server Error");
    }
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: User,
    @Headers('token') token: Headers,
  ) {
    try {
      return this.usersService.update(+id, updateUserDto, token);
    } catch (err) {
      throw new Error("Internal Server Error");
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Headers('token') token: Headers) {
    try {
      return this.usersService.remove(+id, token);
    } catch (err) {
      throw new Error("Internal Server Error");
    }
  }
}

@Controller('userLeader')
export class UserLeaderController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  findAll(@Headers('token') token: Headers) {
    try {
      return this.usersService.findAllLeaders(token);
    } catch (err) {
      throw new Error("Internal Server Error");
    }
  }
}

@Controller('usersAuth')
export class UsersAuthController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  auth(@Body() body: AuthEntity) {
    try {
      return this.usersService.auth(body);
    } catch (err) {
      throw new Error('Internal Server Error');
    }
  }
}

@Controller('usersForgotPassword')
export class UsersForgotPasswordController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  auth(@Body() forgotPassword: ForgotPasswordEntity) {
    try {
      return this.usersService.forgotPassword(forgotPassword);
    } catch (err) {
      throw new Error('Internal Server Error');
    }
  }
}

@Controller('usersResetPassword')
export class UsersResetPasswordController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  auth(@Body() resetPassword: ResetPasswordEntity) {
    try {
      return this.usersService.resetPassword(resetPassword);
    } catch (err) {
      throw new Error('Internal Server Error');
    }
  }
}