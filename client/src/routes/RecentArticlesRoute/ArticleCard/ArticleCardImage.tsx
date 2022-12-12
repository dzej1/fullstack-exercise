import Image from "react-bootstrap/Image";

type ArticleCardImageProps = {
  imageId: number;
};

function ArticleCardImage({ imageId }: ArticleCardImageProps) {
  return (
    <Image
      src={`http://localhost:3333/images/${imageId}`}
      className="p-2 img-fluid"
      width={300}
      height={300}
    />
  );
}

export default ArticleCardImage;
