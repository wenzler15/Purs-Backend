/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { HttpException } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from 'src/companies/models/auth.entity';
import { ForgotPasswordEntity } from 'src/companies/models/forgotPassword.entity';
import { ResetPasswordEntity } from 'src/companies/models/resetPassword.entity';
import { Repository } from 'typeorm';
import { UserEntity } from './models/users.entity';
import { User } from './models/users.interface';
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { ExportUrlEntity } from 'src/export-url/models/exportUrl.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { LeadEntity } from 'src/lead/models/lead.entity';
import { CompanyEntity } from 'src/companies/models/companies.entity';
import { RoleEntity } from 'src/roles/models/role.entity';
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ExportUrlEntity)
    private readonly exportUrl: Repository<ExportUrlEntity>,
    @InjectRepository(LeadEntity)
    private readonly leadRepository: Repository<LeadEntity>,
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    private readonly mailerService: MailerService,
  ) { }

  async create(createUserDto: User, token: string = '') {
    const { cpf, idCompany, password } = createUserDto;

    const userExists = await this.userRepository.findOne({
      where: { cpf },
    });

    if (userExists) {
      return false;
    }

    if (!idCompany || idCompany == null) {
      const decodeToken = await this.decodeToken(token);

      createUserDto.idCompany = decodeToken.company;
    }

    if (!password || password === "") {
      createUserDto.password = this.generateRandomPassword(10)
    }    

    const backupPass = createUserDto.password;

    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.userRepository.save(createUserDto);

    await this.mailerService.sendMail({
      to: createUserDto.email,
      from: process.env.SEND_GRID_FROM,
      subject: 'Novo usuário',
      html: `<p>Você foi cadastrado pela sua empresa na Purs! <br/> Seja muito bem vindo(a) <br/> Use seu e-mail e essa senha temporária: ${backupPass}, para acessar a melhor plataforma de gestão. <br/> <a href="www.purs.com.br/login"> Clique aqui!</a> <p> `,
    });

    user.password = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetToken = undefined;
    user.token = undefined;

    return { message: 'User created!', user }
  }

  async findAll() {
    const users = await this.userRepository.find();

    users.forEach((user: User) => {
      user.password = undefined;
      user.passwordResetExpires = undefined;
      user.passwordResetToken = undefined;
      user.token = undefined;
    });

    return users;
  }

  async dashEmployees(token: string) {
    const decodeToken = await this.decodeToken(token);

    const employees = await this.userRepository.find({ where: {idCompany: decodeToken.company}, select: ["id", "name", "email", "idLeader", "idRole"] });

    await Promise.all(employees.map(async(item: any) => {
      if(item.idLeader) {
        const user = await this.userRepository.findOne({where: {id: item.idLeader}})
        
        item.leaderName = user.name;
      }

      const role = await this.roleRepository.findOne({where: {id: item.idRole }})
      
      item.roleName = role.roleName;
    }))

    return employees;
  }

  async listEmployees(token: string) {
    const decodeToken = await this.decodeToken(token);

    const users = await this.userRepository.find({ select: {id: true, name: true, email: true}, where: {idCompany : decodeToken.company} });

    return users;
  }

  async findAllLeaders(token: string) {
    const decodeToken = this.decodeToken(token)

    const leaders = await this.userRepository.createQueryBuilder('user').innerJoinAndSelect('role', 'role', 'role.id = user.idRole').select("user.*").getMany();

    return leaders;
  }

  async findOne(token: string) {
    const decodedToken = this.decodeToken(token)

    const user: any = await this.userRepository.findOne({ where: { id: decodedToken.id } });

    const company = await this.companyRepository.findOne({ where: { id: user.idCompany }});

    if (!user) throw new HttpException("User didn't exists!", HttpStatus.BAD_REQUEST);

    user.password = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetToken = undefined;
    user.token = undefined;

    user.companyLogo = company.logoLink;

    return user;
  }

  async getOne(token: string, id: number) {
    const decodedToken = this.decodeToken(token)

    const user: any = await this.userRepository.findOne({ where: { id, idCompany: decodedToken.company } });

    const company = await this.companyRepository.findOne({ where: { id: user.idCompany }});

    const role = await this.roleRepository.findOne({ where: {id: user.idRole}});

    user.roleName = role.roleName;

    if(user.idLeader) {
      const leader = await this.userRepository.findOne({ where: {id: user.idLeader}});

      user.leaderName = leader.name
    }

    if (!user) throw new HttpException("User didn't exists!", HttpStatus.BAD_REQUEST);

    user.password = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetToken = undefined;
    user.token = undefined;

    user.companyLogo = company.logoLink;

    return user;
  }

  async update(updateUserDto: User, token: string, id: number) {
    const decodedToken = this.decodeToken(token)

    const user = await this.userRepository.findOne({ where: { id, idCompany: decodedToken.company } });

    if (!user) throw new HttpException("User didn't exists!", HttpStatus.BAD_REQUEST);

    if (updateUserDto.password)
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);

    const userUpdated = await this.userRepository.save({
      ...user,
      ...updateUserDto,
    });

    userUpdated.password = undefined;
    userUpdated.passwordResetExpires = undefined;
    userUpdated.passwordResetToken = undefined;
    userUpdated.token = undefined;

    return { message: 'User updated', user: userUpdated };
  }

  async handleResp(id: number, updateUserDto: User, token: string) {
    const decodedToken = this.decodeToken(token)

    const logged = await this.userRepository.findOne({ where: { id: decodedToken.id } });

    if(logged.responsible !== 1) throw new HttpException("Unauthorizes", HttpStatus.UNAUTHORIZED);

    const user = await this.userRepository.findOne({ where: { id } });

    await this.userRepository.save({
      ...user,
      ...updateUserDto,
    });

    return { message: 'Responsibles updated!' };
  }


  async remove(id: number, token: string) {
    const decodedToken = this.decodeToken(token)

    if (decodedToken.id != id) {
      throw new HttpException("You don't have permission!", HttpStatus.FORBIDDEN);
    }

    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) throw new HttpException("User didn't exists!", HttpStatus.BAD_REQUEST);

    return { message: 'User deleted!', user: this.userRepository.delete(id) };
  }

  async auth(body: AuthEntity) {
    const { email, password } = body;

    if (!email || !password)
      throw new HttpException("Please send the email and password!", HttpStatus.BAD_REQUEST);

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) throw new HttpException("User not found!", HttpStatus.BAD_REQUEST);

    if (!(await bcrypt.compare(password, user.password)))
      throw new HttpException("Password or email wrong!", HttpStatus.BAD_REQUEST);

    user.password = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetToken = undefined;

    const token = this.generateToken({ id: user.id, company: user.idCompany });

    const newData = user;
    newData.token = token;

    await this.userRepository.save({
      ...user,
      ...newData,
    });

    return {
      message: 'User Logged',
      token,
      user
    };
  }

  async forgotPassword(forgotPassword: ForgotPasswordEntity) {
    const { email } = forgotPassword;

    if (!email)
      throw new HttpException("Please send the email!", HttpStatus.BAD_REQUEST);

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user)
      throw new HttpException("User not found!", HttpStatus.BAD_REQUEST);

    const token = crypto.randomBytes(3).toString('hex');

    const now = new Date();
    now.setHours(now.getHours() + 1);

    await this.userRepository.findOne({ where: { email } });

    const newInfos = user;

    newInfos.passwordResetToken = token;
    newInfos.passwordResetExpires = now;

    await this.userRepository.save({
      ...user,
      ...newInfos,
    });

    await this.mailerService.sendMail({
      to: email,
      from: process.env.SEND_GRID_FROM,
      subject: 'Esqueci minha senha',
      html: `<p>Esqueceu sua senha? Não tem problema, use esse token para redefinir sua senha: ${token} <p>`,
    });

    return { message: 'Token sent' };
  }

  async generateURL(file: any, token: string) {
    const userDecoded = await this.decodeToken(token);

    const user = await this.leadRepository.findOne({ where: { id: userDecoded.id } });

    const ext = file.originalname.split(".")[1];

    const hash = crypto.createHash('sha256');

    hash.update(user.email);

    const hashedEmail = hash.digest('hex');

    await this.uploadFile(file, 'purs-docs', `${hashedEmail}.${ext}`)

    const urlExists = await this.exportUrl.findOne({ where: { link: `https://purs-docs.s3.amazonaws.com/${hashedEmail}.${ext}` } });

    if (!urlExists) {
      const url = await this.exportUrl.save({ link: `https://purs-docs.s3.amazonaws.com/${hashedEmail}.${ext}` });

      return { message: 'Export url created!', link: url.id }
    }

    return { message: 'Export url created!', link: urlExists.id }
  }

  async resetPassword(resetPassword: ResetPasswordEntity) {
    const { email, token, password } = resetPassword;

    if (!email || !token || !password)
      throw new HttpException("Please send all the infos!", HttpStatus.BAD_REQUEST);

    const user = await this.userRepository.findOne({ where: { email } });

    if (!user)
      throw new HttpException("User not found!", HttpStatus.BAD_REQUEST);

    if (token !== user.passwordResetToken)
      throw new HttpException("Wrong token!", HttpStatus.BAD_REQUEST);

    const now = new Date();

    if (now > user.passwordResetExpires)
      throw new HttpException("Expired token, create a new one", HttpStatus.BAD_REQUEST);

    const newData = user;
    newData.password = await bcrypt.hash(password, 10);

    await this.userRepository.save({
      ...user,
      ...newData,
    });

    return { message: 'Password updated!' }
  }

  decodeToken(token: string) {
    return jwt.verify(token, '7ccd7835da99ef1dbbce76128d3ae0e7')
  }

  generateToken(params = {}) {
    return jwt.sign(params, '7ccd7835da99ef1dbbce76128d3ae0e7', {
      expiresIn: 8640000,
    });
  }

  async uploadFile(file: any, bucket: string, fileName: string) {
    const client = new S3Client({
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_KEY,
        secretAccessKey: process.env.AWS_SECRET,
      },
    });

    const uploadParams = {
      Bucket: bucket,
      Key: fileName,
      Body: file.buffer,
    };

    try {
      const command = new PutObjectCommand(uploadParams);
      const response = await client.send(command);
      return response;
    } catch (error) {
      console.error("Erro ao fazer upload do arquivo:", error);
    }

  }

  generateRandomPassword(length) {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}
}
