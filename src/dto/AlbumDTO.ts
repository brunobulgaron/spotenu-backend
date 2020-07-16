import { Genre } from "../models/Genre";

export interface albumDTO {
    name: string,
    created_by: string,
    id_genre: Genre[]
};