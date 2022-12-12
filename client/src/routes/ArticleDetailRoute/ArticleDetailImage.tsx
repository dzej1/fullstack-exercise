import { useLoaderData } from "react-router";
import Image from "react-bootstrap/Image";

import { ArticleDetailType } from "../../types";

function ArticleDetailImage() {
  const article = useLoaderData() as Awaited<{ data: ArticleDetailType }>;
  const imageUrl = "http://localhost:3333/images/" + article.data.imageId;

  return <Image src={imageUrl} className="p-2 mw-100" />;
}

export default ArticleDetailImage;
