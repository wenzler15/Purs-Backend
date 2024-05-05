import { Question } from "src/questions/models/questions.interface";

/* eslint-disable prettier/prettier */
export interface QuestionSections {
    id?: number;
    idResearch: number;
    desc: string;
    questions?: Question[];
    deletedAt?: Date;
    createdAt?: Date;
    updatedAt?: Date;
}