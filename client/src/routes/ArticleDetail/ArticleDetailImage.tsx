import { useLoaderData } from "react-router";
import Image from "react-bootstrap/Image";

import { ArticleDetailType } from "../../types";

function ArticleDetailImage() {
  const article = useLoaderData() as Awaited<{ data: ArticleDetailType }>;
  return (
    <Image
      src={article.data.imageUrl || "https://placekitten.com/g/500/300"}
      className="p-2 mw-100"
    />
  );
}

export default ArticleDetailImage;
