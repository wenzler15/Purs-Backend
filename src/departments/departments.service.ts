import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Department } from './models/department.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { DepartmentEntity } from './models/department.entity';
import { Repository } from 'typeorm';
import { CompaniesService } from 'src/companies/companies.service';
import { UserEntity } from 'src/users/models/users.entity';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(DepartmentEntity)
    private readonly departmentRepository: Repository<DepartmentEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly companyService: CompaniesService
  ) { }

  async create(createDepartmentDto: Department, token: string) {
    const decodedToken = await this.companyService.decodeToken(token);

    createDepartmentDto.idCompany = decodedToken.company;

    const department = await this.departmentRepository.save(createDepartmentDto);

    return { message: 'Department created!', department }
  }

  async findAll(token: string) {
    const decodedToken = await this.companyService.decodeToken(token);

    const departments: any = await this.departmentRepository.createQueryBuilder('department')
            .leftJoinAndSelect('user', 'user', 'user.id = department.idLeader')
            .where('department.idCompany = :companyId', { companyId: decodedToken.company })
            .select([
                'department.id',
                'department.name',
                'department.desc',
                'department.idLeader'
            ])
            .getMany();

    await Promise.all(departments.map(async(item: any) => {
      const usr = await this.usersRepository.findOne({where: {id: item.idLeader}})

      item.leaderName = usr.name
    }))

    return departments;
  }

  async findOne(id: number, token: string) {
    const decodedToken = await this.companyService.decodeToken(token);

    const department: any = await this.departmentRepository.findOne({ where: { id } });

    if(department.idCompany !== decodedToken.company) throw new HttpException('User unauthorized!', HttpStatus.UNAUTHORIZED);

    if (!department) throw new HttpException("Department didn't exists!", HttpStatus.BAD_REQUEST);

    const responsible = await this.usersRepository.findOne({ where: {id: department.idLeader} });

    department.leaderName = responsible.name;

    return department;
  }

  async update(id: number, updateDepartmentDto: Department, token: string) {
    const decodedToken = await this.companyService.decodeToken(token);

    const department = await this.departmentRepository.findOne({ where: { id } });

    if(department.idCompany !== decodedToken.company) throw new HttpException('User unauthorized!', HttpStatus.UNAUTHORIZED);

    if (!department) throw new HttpException("Department didn't exists!", HttpStatus.BAD_REQUEST);

    const departmentUpdated = await this.departmentRepository.save({
      ...department,
      ...updateDepartmentDto,
    })

    return { message: 'Department updated!', department: departmentUpdated };
  }

  async remove(id: number, token: string) {
    const decodedToken = await this.companyService.decodeToken(token);

    const department = await this.departmentRepository.findOne({ where: { id } });

    if(department.idCompany !== decodedToken.company) throw new HttpException('User unauthorized!', HttpStatus.UNAUTHORIZED);

    if (!department) throw new HttpException("Department didn't exists!", HttpStatus.BAD_REQUEST);

    return { message: 'Department deleted!', department: this.departmentRepository.delete(id) }
  }
}
