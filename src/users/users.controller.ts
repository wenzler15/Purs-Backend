/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthEntity } from 'src/companies/models/auth.entity';
import { ForgotPasswordEntity } from 'src/companies/models/forgotPassword.entity';
import { ResetPasswordEntity } from 'src/companies/models/resetPassword.entity';
import { User } from './models/users.interface';
import { UsersService } from './users.service';
import { Headers } from "@nestjs/common";
import { Authorization } from './models/authorization.interface';
import { FileInterceptor } from '@nestjs/platform-express';

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
    @Headers() headers: Authorization,
  ) {
    try {
      return this.usersService.update(+id, updateUserDto, headers.authorization);
    } catch (err) {
      throw new Error("Internal Server Error");
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Headers() headers: Authorization) {
    try {
      return this.usersService.remove(+id, headers.authorization);
    } catch (err) {
      throw new Error("Internal Server Error");
    }
  }
}

@Controller('userLeader')
export class UserLeaderController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  findAll(@Headers() hearders: Authorization) {
    try {
      return this.usersService.findAllLeaders(hearders.authorization);
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

@Controller('usersCreateURLOrg')
export class UsersCreateURLOrgController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @UseInterceptors(FileInterceptor("orgfile"))
  createURL(@UploadedFile() file: Express.Multer.File, @Headers() headers: Authorization) {
    try {
      return this.usersService.generateURL(file, headers.authorization);
    } catch (err) {
      throw new Error('Internal Server Error');
    }
  }
}

