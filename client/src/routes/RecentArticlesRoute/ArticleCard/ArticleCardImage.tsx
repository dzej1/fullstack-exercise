import Image from "react-bootstrap/Image";

type ArticleCardImageProps = {
  src: string;
};

function ArticleCardImage({ src }: ArticleCardImageProps) {
  return <Image src={src} width={300} height={300} className="p-2" />;
}

export default ArticleCardImage;
