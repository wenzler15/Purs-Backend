/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('lead')
export class LeadEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: '' })
    companyName: string;

    @Column({ default: '' })
    companyPhone: string;

    @Column({ default: '' })
    companySegment: string;

    @Column({ default: '' })
    occupation: string; 

    @Column({ default: '' })
    fullName: string;

    @Column({ default: '' })
    email: string;

    @Column({ default: '' })
    password: string; 

    @Column({ type: 'integer', default: 1 })
    status: number;

    @Column({ default: '' })
    token: string;

    @Column({ default: '' })
    passwordResetToken: string;

    @Column({ type: 'timestamp', nullable: true })
    passwordResetExpires: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    updatedAt: Date;
}
