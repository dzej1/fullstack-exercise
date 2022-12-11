export type JwtPayloadType = {
  username: string;
  sub: number;
  role: string;
  iat: number;
  exp: number;
};
