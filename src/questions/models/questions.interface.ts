/* eslint-disable prettier/prettier */
export interface Question {
    id: number;
    idResearch: number;
    desc: string;
    idSection: number;
    idQuestionType: number;
    notNull: boolean;
    redirectSection: string;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}