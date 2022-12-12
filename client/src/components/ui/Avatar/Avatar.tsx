import React from "react";
import Image from "react-bootstrap/Image";

type AvatarProps = {
  username: string;
  diameter?: number;
};

function Avatar({ username, diameter = 23 }: AvatarProps): JSX.Element {
  return (
    <Image
      alt={`${username}'s avatar`}
      src={`https://ui-avatars.com/api/?name=${username}`}
      width={diameter}
      height={diameter}
      roundedCircle
      className="me-2"
    />
  );
}

export default Avatar;
