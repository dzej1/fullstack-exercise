export type ArticleType = {
  id: number;
  userId: number;
  createdAt: string;
  title: string;
  perex: string;
  content: string;
  comments: Comment[];
};
