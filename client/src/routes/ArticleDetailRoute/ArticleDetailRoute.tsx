import axios from "axios";
import { useLoaderData } from "react-router";
import { QueryClient } from "@tanstack/react-query";

import Container from "react-bootstrap/Container";

import ArticleDetailContent from "./ArticleDetailContent";
import ArticleDetailComments from "./ArticleDetailComments/ArticleDetailComments";
import ArticleDetailImage from "./ArticleDetailImage";
import ArticleDetailTitle from "./ArticleDetailTitle";
import ArticleDetailRelatedArticles from "./ArticleDetailRelatedArticles/ArticleDetailRelatedArticles";
import { CreationInfo } from "../../components/ui";
import {
  ArticleDetailParamsType,
  ArticleDetailType,
  ArticleType,
} from "../../types";

const getArticle = (id: number): Promise<ArticleType> =>
  axios.get(`/articles/${id}`);
export const articleDetailQuery = (id: number) => {
  return {
    queryKey: ["article", "detail", id],
    queryFn: async () => getArticle(id),
  };
};

export const loader =
  (queryClient: QueryClient) =>
  async ({
    params,
  }: {
    params: ArticleDetailParamsType;
  }): Promise<ArticleType> => {
    const query = articleDetailQuery(params.id);

    return (
      queryClient.getQueryData(query.queryKey) ??
      (await queryClient.fetchQuery(query))
    );
  };

function ArticleDetailRoute() {
  const article = useLoaderData() as Awaited<{ data: ArticleDetailType }>;

  return (
    <Container className="row m-auto mt-4">
      <Container className="col-12 col-lg-8 mb-4">
        <ArticleDetailTitle />
        <CreationInfo
          username={article.data.user?.username}
          createdAt={article.data.createdAt}
        />
        <ArticleDetailImage />
        <ArticleDetailContent />
      </Container>
      <Container className="col-12 col-lg-4">
        <ArticleDetailRelatedArticles />
      </Container>
      <hr />
      <ArticleDetailComments />
    </Container>
  );
}

export default ArticleDetailRoute;
