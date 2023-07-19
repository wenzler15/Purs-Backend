/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('exportUrl')
export class ExportUrlEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: '' })
    link: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
}
