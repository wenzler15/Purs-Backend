/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('group')
export class GroupEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'integer' })
    idCompany: number;

    @Column({ type: 'integer', array: true, nullable: true })
    users: number[];

    @Column({ default: '' })
    name: string;

    @Column({ default: '' })
    desc: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    updatedAt: Date;

}
