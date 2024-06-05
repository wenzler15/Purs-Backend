import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
const crypto = require('crypto');

@Injectable()
export class UploadsService {
  constructor(private readonly usersService: UsersService) { }

  async uploadLogoImage(createUploadDto: any, headers: any) {
    const { company } = headers;
    
    const ext = createUploadDto.originalname.split(".")[1];

    const hash = crypto.createHash('sha256');

    hash.update(company);

    const hashedNCPJ = hash.digest('hex');

    await this.usersService.uploadFile(createUploadDto, 'purs-docs/logoImage', `${hashedNCPJ}.${ext}`)

    return createUploadDto;
  }
}
