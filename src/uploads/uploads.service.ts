import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyEntity } from 'src/companies/models/companies.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
const crypto = require('crypto');

@Injectable()
export class UploadsService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
    private readonly usersService: UsersService
    ) { }

  async uploadLogoImage(createUploadDto: any, headers: any) {
    const { company } = headers;

    const companyData = await this.companyRepository.findOne({ where: { cnpj: company } });
    
    const ext = createUploadDto.originalname.split(".")[1];

    const hash = crypto.createHash('sha256');

    hash.update(company);

    const hashedNCPJ = hash.digest('hex');

    const datauploaded = await this.usersService.uploadFile(createUploadDto, 'purs-docs', `imageLogo/${hashedNCPJ}.${ext}`)

    if (!datauploaded) throw new HttpException("Error to upload data", HttpStatus.BAD_REQUEST);    

    const companyDatacc = companyData;

    const link = `https://purs-docs.s3.amazonaws.com/imageLogo/${hashedNCPJ}.${ext}`;

    companyDatacc.logoLink = link;

    await this.companyRepository.save({
      ...companyData,
      ...companyDatacc,
    });

    return { message: 'Logo uploaded!', link }
  }
}
