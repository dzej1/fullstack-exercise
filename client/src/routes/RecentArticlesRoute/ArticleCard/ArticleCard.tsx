import ArticleCardFooter from "./ArticleCardFooter";
import CreationInfo from "../../../components/ui/CreationInfo/CreationInfo";
import ArticleCardImage from "./ArticleCardImage";
import ArticleCardTitle from "./ArticleCardTitle";
import ArticleCardPerex from "./ArticleCardPerex";

type ArticleCardProps = {
  perex: string;
  title: string;
  user: { username: string };
  createdAt: string;
  comments: Array<any>;
  id: number;
};

function ArticleCard({
  perex,
  title,
  user,
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
          <CreationInfo username={user.username} createdAt={createdAt} />
          <ArticleCardPerex perex={perex} />
          <ArticleCardFooter comments={comments} id={id} />
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
