import { QuestionAlternatives } from "src/questions-alternatives/models/questions-alternatives.interface";

/* eslint-disable prettier/prettier */
export interface Question {
    id: number;
    idResearch: number;
    desc: string;
    idSection: number;
    idQuestionType: number;
    notNull: boolean;
    redirectSection: string;
    alternatives?: QuestionAlternatives[];
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}