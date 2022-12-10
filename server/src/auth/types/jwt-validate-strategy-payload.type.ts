export type JwtValidateStrategyPayloadType = {
  username: string;
  sub: number;
  role: string;
  iat: number;
  exp: number;
};
