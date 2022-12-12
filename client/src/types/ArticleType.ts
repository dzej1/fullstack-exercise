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
  imageId: number;
  comments: CommentType[];
};

export type ArticleDetailType = ArticleType & {
  relatedArticles: ArticleType[];
};
