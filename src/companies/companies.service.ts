/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CompanyEntity } from './models/companies.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './models/companies.interface';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { AuthEntity } from './models/auth.entity';
import { ForgotPasswordEntity } from './models/forgotPassword.entity';
import { SendGridService } from '@anchan828/nest-sendgrid';
import { ResetPasswordEntity } from './models/resetPassword.entity';
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
    private readonly sendGrid: SendGridService,
  ) { }

  async create(createCompanyDto: Company) {
    const { cnpj } = createCompanyDto;

    const companyExists = await this.companyRepository.findOne({
      where: { cnpj },
    });

    if (companyExists) throw new HttpException("Company already exists!", HttpStatus.BAD_REQUEST);

    const company = await this.companyRepository.save(createCompanyDto);

    company.password = undefined;
    company.passwordResetExpires = undefined;
    company.passwordResetToken = undefined;

    return { message: 'User created!', company }
  }

  async findAll() {
    const companies = await this.companyRepository.find();

    companies.forEach((company: Company) => {
      company.password = undefined;
      company.passwordResetExpires = undefined;
      company.passwordResetToken = undefined;
    });

    return companies;
  }

  async findOne(id: number) {
    const company = await this.companyRepository.findOne({ where: { id } });

    if (!company) throw new HttpException("Company didn't exists!", HttpStatus.BAD_REQUEST);

    company.password = undefined;
    company.passwordResetExpires = undefined;
    company.passwordResetToken = undefined;

    return company;
  }

  async update(id: number, updateCompanyDto: Company) {
    const company = await this.companyRepository.findOne({ where: { id } });

    if (!company) throw new HttpException("Company didn't exists!", HttpStatus.BAD_REQUEST);

    if (updateCompanyDto.password)
      updateCompanyDto.password = await bcrypt.hash(updateCompanyDto.password, 10);

    const companyUpdated = await this.companyRepository.save({
      ...company,
      ...updateCompanyDto,
    });

    companyUpdated.password = undefined;
    companyUpdated.passwordResetExpires = undefined;
    companyUpdated.passwordResetToken = undefined;

    return { message: 'Company updated', company: companyUpdated };
  }

  async remove(id: number) {
    const company = await this.companyRepository.findOne({ where: { id } });

    if (!company) throw new HttpException("Company didn't exists!", HttpStatus.BAD_REQUEST);

    return { message: "Company deleted!", company: this.companyRepository.delete(id) };
  }

  async auth(body: AuthEntity) {
    const { email, password } = body;

    if (!email || !password)
      throw new HttpException("Please send the email and password!", HttpStatus.BAD_REQUEST);

    const company = await this.companyRepository.findOne({ where: { email } });

    if (!company) throw new HttpException("Company not found!", HttpStatus.BAD_REQUEST);

    if (!(await bcrypt.compare(password, company.password)))
      throw new HttpException("Password or email wrong!", HttpStatus.BAD_REQUEST);

    company.password = undefined;

    return {
      message: 'User Logged',
      token: this.generateToken({ id: company.id }),
      company
    };
  }

  async forgotPassword(forgotPassword: ForgotPasswordEntity) {
    const { email } = forgotPassword;

    if (!email)
      throw new HttpException("Please send the email!", HttpStatus.BAD_REQUEST);

    const company = await this.companyRepository.findOne({ where: { email } });

    if (!company)
      throw new HttpException("Company not found!", HttpStatus.BAD_REQUEST);

    const token = crypto.randomBytes(3).toString('hex');

    const now = new Date();
    now.setHours(now.getHours() + 1);

    await this.companyRepository.findOne({ where: { email } });

    const newInfos = company;

    newInfos.passwordResetToken = token;
    newInfos.passwordResetExpires = now;

    await this.companyRepository.save({
      ...company,
      ...newInfos,
    });

    await this.sendGrid.send({
      to: email,
      from: process.env.SEND_GRID_FROM,
      subject: 'Esqueci minha senha',
      text: 'Parece que você esqueceu sua senha',
      html: `<p>Esqueceu sua senha? Não tem problema, use esse token para redefinir sua senha: ${token} <p>`,
    });

    return { message: 'Token sent' };
  }

  async resetPassword(resetPassword: ResetPasswordEntity) {
    const { email, token, password } = resetPassword;

    if (!email || !token || !password)
      throw new HttpException("Please send all the infos!", HttpStatus.BAD_REQUEST);

    const company = await this.companyRepository.findOne({ where: { email } });

    if (!company)
      throw new HttpException("Company not found!", HttpStatus.BAD_REQUEST);

    if (token !== company.passwordResetToken)
      throw new HttpException("Wrong token!", HttpStatus.BAD_REQUEST);

    const now = new Date();

    if (now > company.passwordResetExpires)
      throw new HttpException("Expired token, create a new one", HttpStatus.BAD_REQUEST);

    const newData = company;
    newData.password = await bcrypt.hash(password, 10);

    await this.companyRepository.save({
      ...company,
      ...newData,
    });

    return { message: 'Password updated!' }
  }

  generateToken(params = {}) {
    return jwt.sign(params, '7ccd7835da99ef1dbbce76128d3ae0e7', {
      expiresIn: 86400,
    });
  }
}
