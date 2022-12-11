import ArticleCardFooter from "./ArticleCardFooter";
import ArticleCardCreationInfo from "./ArticleCardCreationInfo";
import ArticleCardImage from "./ArticleCardImage";
import ArticleCardTitle from "./ArticleCardTitle";
import ArticleCardPerex from "./ArticleCardPerex";

type ArticleCardProps = {
  perex: string;
  title: string;
  userId: number;
  createdAt: string;
  comments: Array<any>;
  id: number;
};

function ArticleCard({
  perex,
  title,
  userId,
  createdAt,
  comments,
  id,
}: ArticleCardProps) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-auto">
          <ArticleCardImage src="https://placekitten.com/g/300/300" />
        </div>
        <div className="col">
          <ArticleCardTitle title={title} />
          <ArticleCardCreationInfo userId={userId} createdAt={createdAt} />
          <ArticleCardPerex perex={perex} />
          <ArticleCardFooter comments={comments} id={id} />
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
