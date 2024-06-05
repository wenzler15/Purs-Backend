import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [UploadsController],
  providers: [UploadsService, UsersService]
})
export class UploadsModule {}
