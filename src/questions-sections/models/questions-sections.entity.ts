/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('questions-sections')
export class QuestionsSectionsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: '' })
    desc: string;

    @Column({ type: 'integer' })
    idResearch: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    updatedAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    deletedAt: Date;
}
