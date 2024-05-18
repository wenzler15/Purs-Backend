/* eslint-disable prettier/prettier */
export interface ResearchResponse {
    id: number;
    researchId: number;
    userId: number;
    questionId: number;
    answer: string;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}