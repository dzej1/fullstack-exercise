import { CommentType } from "./CommentType";

export type ArticleType = {
  id: number;
  user: {
    username: string;
  };
  createdAt: string;
  title: string;
  perex: string;
  content: string;
  imageUrl: string;
  comments: CommentType[];
};

export type ArticleDetailType = ArticleType & {
  relatedArticles: ArticleType[];
};
