import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from './models/role.entity';
import { Role } from './models/role.interface';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) { }

  async create(createRoleDto: Role) {
    const role = await this.roleRepository.save(createRoleDto);

    return { message: 'Role created!', role }
  }

  async findAll() {
    const roles = await this.roleRepository.find();

    return roles;
  }

  async findOne(id: number) {
    const role = await this.roleRepository.findOne({ where: { id } });

    if (!role) throw new HttpException("Role didn't exists!", HttpStatus.BAD_REQUEST);

    return role;
  }

  async update(id: number, updateRoleDto: Role) {
    const role = await this.roleRepository.findOne({ where: { id } });

    if (!role) throw new HttpException("Role didn't exists!", HttpStatus.BAD_REQUEST);

    const roleUpdated = await this.roleRepository.save({
      ...role,
      ...updateRoleDto,
    })

    return { message: 'Role updated!', role: roleUpdated };
  }

  async remove(id: number) {
    const role = await this.roleRepository.findOne({ where: { id } });

    if (!role) throw new HttpException("Role didn't exists!", HttpStatus.BAD_REQUEST);

    return { message: 'Role deleted!', role: this.roleRepository.delete(id) }
  }
}
