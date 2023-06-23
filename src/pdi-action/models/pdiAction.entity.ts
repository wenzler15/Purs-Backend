/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pdiAction')
export class PdiActionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'integer' })
    idFather: number;

    @Column({ default: '' })
    title: string;

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
