type ArticleCardTitleProps = {
  title: string;
};

function ArticleCardTitle({ title }: ArticleCardTitleProps) {
  return <h4>{title}</h4>;
}

export default ArticleCardTitle;
