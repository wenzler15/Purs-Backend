/* eslint-disable prettier/prettier */
import { QuestionSections } from 'src/questions-sections/models/questions-sections.interface';

export interface Research {
    id: number;
    subtitle: string;
    desc: string;
    title: string;
    idCompany: number;
    idUser: number;
    status: number;
    sections?: QuestionSections[];
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}