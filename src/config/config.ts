import ms from "ms";

const config = {
  port: Number(process.env.PORT),
  corsOrigin: process.env.CORS_ORIGIN,
  jwtSecret: process.env.JWT_SECRET as string,
  expiresIn: process.env.EXPIRES_IN as ms.StringValue,
};

export default config;
