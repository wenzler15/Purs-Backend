/* eslint-disable prettier/prettier */
import { SendGridService } from '@anchan828/nest-sendgrid';
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
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly sendGrid: SendGridService,
  ) { }

  async create(createUserDto: User) {
    const { cpf } = createUserDto;

    const userExists = await this.userRepository.findOne({
      where: { cpf },
    });

    if (userExists)
      throw new HttpException('User already exists!', HttpStatus.BAD_REQUEST);

    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.userRepository.save(createUserDto);

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

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) throw new HttpException("User didn't exists!", HttpStatus.BAD_REQUEST);

    user.password = undefined;
    user.passwordResetExpires = undefined;
    user.passwordResetToken = undefined;
    user.token = undefined;

    return user;
  }

  async update(id: number, updateUserDto: User) {
    const user = await this.userRepository.findOne({ where: { id } });

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

  async remove(id: number) {
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

    const token = this.generateToken({ id: user.id });

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

  generateToken(params = {}) {
    return jwt.sign(params, '7ccd7835da99ef1dbbce76128d3ae0e7', {
      expiresIn: 86400,
    });
  }
}
