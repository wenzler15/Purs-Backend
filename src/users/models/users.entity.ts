/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'integer' })
    idCompany: number;

    @Column({ type: 'integer', nullable: true })
    idRole: number;

    @Column({ type: 'integer', nullable: true })
    idLeader: number;

    @Column({ default: '' })
    cpf: string;

    @Column({ default: '' })
    name: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    updatedAt: Date;

    @Column({ default: '' })
    email: string;

    @Column({ default: '', nullable: true })
    street: string;

    @Column({ default: '', nullable: true })
    district: string;

    @Column({ default: '' })
    city: string;

    @Column({ default: '' })
    state: string;

    @Column({ default: '' })
    zipCode: string;

    @Column({ default: '' })
    neighborhood: string;

    @Column({ type: 'integer', nullable: true })
    houseNumber?: number;

    @Column({ default: ''})
    complement: string;

    @Column({ default: '' })
    phone: string;

    @Column({ type: 'integer', default: 1 })
    status: number;

    @Column({ default: '' })
    token: string;

    @Column({ type: 'integer', default: 1 })
    tempPassword: number;

    @Column({ type: 'integer', default: 0})
    responsible: number;

    @Column({ default: '' })
    password: string;

    @Column({ default: '' })
    passwordResetToken: string;

    @Column({ type: 'timestamp', nullable: true })
    passwordResetExpires: Date;
}
