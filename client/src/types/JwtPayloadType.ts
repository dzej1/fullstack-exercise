export type JwtPayload = {
  username: string;
  sub: number;
  role: string;
  iat: number;
  exp: number;
};
