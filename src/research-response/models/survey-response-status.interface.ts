/* eslint-disable prettier/prettier */
export interface SurveyResponseStatus {
    id: number;
    researchId: number;
    userId: number;
    responded: boolean;
    deletedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}