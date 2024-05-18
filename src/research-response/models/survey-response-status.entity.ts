/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('surveyResponseStatus')
export class SurveyResponseStatusEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'integer' })
    researchId: number;

    @Column({ type: 'integer' })
    userId: number;

    @Column({ type: 'boolean' })
    responded: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    updatedAt: Date;

    @Column({ type: 'timestamp', nullable: true })
    deletedAt: Date;
}
