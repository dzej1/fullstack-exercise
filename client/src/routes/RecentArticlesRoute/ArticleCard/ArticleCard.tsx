import ArticleCardFooter from "./ArticleCardFooter";
import ArticleCardImage from "./ArticleCardImage";
import ArticleCardPerex from "./ArticleCardPerex";
import ArticleCardTitle from "./ArticleCardTitle";
import CreationInfo from "../../../components/ui/CreationInfo/CreationInfo";

type ArticleCardProps = {
  perex: string;
  title: string;
  user: { username: string };
  createdAt: string;
  comments: Array<any>;
  id: number;
  imageId: number;
};

function ArticleCard({
  perex,
  title,
  user,
  createdAt,
  comments,
  id,
  imageId,
}: ArticleCardProps) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-auto">
          <ArticleCardImage imageId={imageId} />
        </div>
        <div className="col">
          <ArticleCardTitle title={title} />
          <CreationInfo username={user.username} createdAt={createdAt} />
          <ArticleCardPerex perex={perex} />
          <ArticleCardFooter comments={comments} id={id} />
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
