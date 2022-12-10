import React from "react";
import Image from "react-bootstrap/Image";

type AvatarProps = {
  username: string;
};

function Avatar({ username }: AvatarProps): JSX.Element {
  return (
    <Image
      alt={`${username}' avatar`}
      src={`https://ui-avatars.com/api/?name=${username}`}
      width="23"
      height="23"
      roundedCircle
      className="me-2"
    />
  );
}

export default Avatar;
