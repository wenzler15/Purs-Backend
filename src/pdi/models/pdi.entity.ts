/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pdi')
export class PdiEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'integer' })
    owner: number;

    @Column({ type: 'integer' })
    companyOwner: number;

    @Column({ default: '' })
    title: string;

    @Column({ default: '' })
    result: string;

    @Column({ default: '' })
    desc: string;

    @Column({ default: '' })
    delivery: string;

    @Column({ type: 'integer', default: 1 })
    status: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    updatedAt: Date;
}
