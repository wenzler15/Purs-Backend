/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('role')
export class RoleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'integer', nullable: true })
    idDepartment?: number;

    @Column({ type: 'varchar', array: true, nullable: true })
    responsibilities: string[];

    @Column({ type: 'varchar', array: true, nullable: true })
    skills: string[];

    @Column({ type: 'varchar', array: true, nullable: true })
    qualifications: string[];

    @Column({ type: 'integer', nullable: true })
    minSalary: number;

    @Column({ type: 'integer', nullable: true })
    maxSalary: number;

    @Column({ type: 'integer' })
    idCompany: number;

    @Column({ default: '' })
    roleName: string;

    @Column({ default: '' })
    roleDesc: string;

    @Column({ type: 'integer', default: 1 })
    status: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    updatedAt: Date;

}
