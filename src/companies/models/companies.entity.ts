/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('company')
export class CompanyEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: '' })
    name: string;

    @Column({ default: '' })
    corporateName: string;

    @Column({ default: '' })
    logoLink: string;
    
    @Column({ default: '' })
    neighborhood: string;

    @Column({ default: '' })
    arrayResponsible: string;

    @Column({ default: '' })
    mission: string;

    @Column({ default: '' })
    vision: string;

    @Column({ default: '' })
    values: string;

    @Column({ default: '' })
    cnpj: string;

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

    @Column({ default: '', nullable: true })
    city: string;

    @Column({ default: '', nullable: true })
    state: string;

    @Column({ default: '', nullable: true })
    zipCode: string;

    @Column({ default: '', nullable: true })
    phone: string;

    @Column({ type: 'integer', default: 1 })
    status: number;

    @Column({ default: '', nullable: true })
    token: string;

    @Column({ default: ''})
    password: string;

    @Column({ default: '', nullable: true })
    passwordResetToken: string;

    @Column({ type: 'timestamp', nullable: true })
    passwordResetExpires: Date;
}
