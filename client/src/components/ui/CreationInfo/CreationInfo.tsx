import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

type CreationInfoProps = {
  username?: string;
  createdAt: string;
  relative?: boolean;
};

function CreationInfo({
  username = "Some mysterious user",
  createdAt,
  relative,
}: CreationInfoProps) {
  const createdAtFormatted = relative
    ? dayjs(new Date(createdAt)).from(dayjs().subtract(1, "hour"))
    : new Date(createdAt).toLocaleDateString();

  return (
    <p className="text-secondary">
      <small>{username}</small>
      <span className="px-1">•</span>
      <small>{createdAtFormatted}</small>
    </p>
  );
}

export default CreationInfo;
