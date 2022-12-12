import { ArticleType } from "./ArticleType";
import { UserType } from "./UserType";

export type CommentType = {
  id: number;
  createdAt: string;
  articleId: number;
  article: ArticleType;
  userId: number;
  user: UserType;
  contentMarkdown: string;
};
