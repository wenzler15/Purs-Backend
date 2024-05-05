/* eslint-disable prettier/prettier */
import { QuestionsSectionsEntity } from 'src/questions-sections/models/questions-sections.entity';
import { QuestionSections } from 'src/questions-sections/models/questions-sections.interface';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('research')
export class ResearchEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: '' })
    subtitle: string;

    @Column({ default: '' })
    desc: string;

    @Column({ default: '' })
    title: string;

    @Column({ type: 'integer' })
    idCompany: number;

    @Column({ type: 'integer' })
    idUser: number;

    @Column({ type: 'integer' })
    status: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    updatedAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    deletedAt: Date;
}
