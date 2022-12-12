import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import { ArticleType } from "../../../types";

function ArticleDetailRelatedArticle({
  relatedArticle,
}: {
  relatedArticle: ArticleType;
}) {
  return (
    <Container className="text-truncate w-100 mb-3">
      <Link
        to={`/article/${relatedArticle.id}`}
        className="text-decoration-none text-dark"
      >
        <h5>{relatedArticle.title}</h5>
      </Link>
      <small>{relatedArticle.perex.slice(0, 100)}</small>
    </Container>
  );
}

export default ArticleDetailRelatedArticle;
