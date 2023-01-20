/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('company')
export class CompanyEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: '' })
    name: string;

    @Column({ default: '' })
    cnpj: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

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
    phone: string;

    @Column({ type: 'integer', default: 1 })
    status: number;

    @Column({ default: '' })
    password: string;

    @Column({ default: '' })
    passwordResetToken: string;

    @Column({ type: 'timestamp', nullable: true })
    passwordResetExpires: Date;
}
