import { IComment } from "./IComment";

export interface ICommentResponse extends IComment {
    userId: string;
    createdAt: string;
    id: string;
}