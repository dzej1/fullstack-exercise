import { Link } from "react-router-dom";

type ArticleCardFooterProps = {
  comments: Array<any>;
  id: number;
};

function ArticleCardFooter({ comments, id }: ArticleCardFooterProps) {
  const articleUrl = `/article/${id}`;

  return (
    <div className="mb-5 mt-3 my-md-3">
      <Link to={articleUrl} className="text-decoration-none p-2">
        Read whole article
      </Link>
      <span className="text-secondary">{comments.length} comments</span>
    </div>
  );
}

export default ArticleCardFooter;
