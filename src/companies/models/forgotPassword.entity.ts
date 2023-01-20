/* eslint-disable prettier/prettier */
import { Column, Entity } from 'typeorm';

@Entity('auth')
export class ForgotPasswordEntity {
    @Column({ default: '' })
    email: string;
}
