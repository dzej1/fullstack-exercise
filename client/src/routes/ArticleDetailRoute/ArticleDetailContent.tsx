import { useLoaderData } from "react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ArticleType } from "../../types";

function ArticleDetailContent() {
  const { data } = useLoaderData() as Awaited<{ data: ArticleType }>;
  return <ReactMarkdown children={data.content} remarkPlugins={[remarkGfm]} />;
}

export default ArticleDetailContent;
