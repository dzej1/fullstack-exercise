import { useLoaderData } from "react-router";
import { useQuery } from "@tanstack/react-query";

import { articleDetailQuery } from "../ArticleDetailRoute";
import { ArticleDetailType, ArticleType } from "../../../types";
import ArticleDetailRelatedArticle from "./ArticleDetailRelatedArticle";

function ArticleDetailRelatedArticles() {
  const article = useLoaderData() as Awaited<{ data: ArticleType }>;
  const { data } = useQuery(articleDetailQuery(article.data.id)) as Awaited<{
    data: { data: ArticleDetailType };
  }>;

  if (!data) {
    return null;
  }

  return data.data.relatedArticles.length ? (
    <>
      <h3>Related Articles</h3>
      {data.data.relatedArticles.map((relatedArticle) => (
        <ArticleDetailRelatedArticle
          key={relatedArticle.id}
          relatedArticle={relatedArticle}
        />
      ))}
    </>
  ) : null;
}

export default ArticleDetailRelatedArticles;
