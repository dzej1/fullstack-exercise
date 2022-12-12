import { useLoaderData } from "react-router";

import { ArticleType } from "../../types";

function ArticleDetailTitle() {
  const { data } = useLoaderData() as Awaited<{ data: ArticleType }>;
  return <h1>{data.title}</h1>;
}

export default ArticleDetailTitle;
