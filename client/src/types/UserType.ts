import { CommentType } from "./CommentType";
import { ArticleType } from "./ArticleType";

export type UserType = {
  id: number;
  createdAt: Date;
  username: string;
  passwordHash: string;
  refreshTokenHash: string;
  articles: ArticleType[];
  comments: CommentType[];
  role: string;
};
