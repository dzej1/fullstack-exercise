type ArticleCardCreationInfoProps = {
  userId: number;
  createdAt: string;
};

function ArticleCardCreationInfo({
  userId,
  createdAt,
}: ArticleCardCreationInfoProps) {
  const createdAtFormatted = new Date(createdAt).toLocaleDateString();

  return (
    <p className="text-secondary">
      <small>{userId}</small>
      <span className="px-1">•</span>
      <small>{createdAtFormatted}</small>
    </p>
  );
}

export default ArticleCardCreationInfo;
