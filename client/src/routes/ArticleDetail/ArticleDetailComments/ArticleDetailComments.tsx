import { useLoaderData } from "react-router";
import Container from "react-bootstrap/Container";
import ArticleDetailCommentsAddNew from "./ArticleDetailCommentsAddNew";
import { useUser } from "../../../hooks";
import { useQuery } from "@tanstack/react-query";
import { articleDetailQuery } from "../ArticleDetail";
import ArticleDetailComment from "./ArticleDetailComment";
import { ArticleType, CommentType } from "../../../types";

function ArticleDetailComments() {
  const article = useLoaderData() as Awaited<{ data: ArticleType }>;
  const { data } = useQuery(articleDetailQuery(article.data.id)) as Awaited<{
    data: { data: ArticleType };
  }>;
  const { isLogged } = useUser();

  if (!data) {
    return null;
  }

  const numberOfComments = data.data?.comments?.length;
  const comments = [...data.data?.comments].reverse();

  return (
    <Container className="col-12">
      <h5>Comments ({numberOfComments})</h5>
      {isLogged ? <ArticleDetailCommentsAddNew /> : null}
      {comments.map((comment: CommentType) => (
        <ArticleDetailComment key={comment.id} comment={comment} />
      ))}
    </Container>
  );
}

export default ArticleDetailComments;
