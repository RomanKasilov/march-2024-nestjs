type ConfigType = {
  app: AppConfigType;
  database: DatabaseConfigType;
  redis: RedisConfigType;
  aws: AwsConfigType;
  sentry: SentryConfigType;
};
type AppConfigType = {
  port: number;
  host: string;
};
type DatabaseConfigType = {
  port: number;
  host: string;
  user: string;
  name: string;
  password: string;
};
type RedisConfigType = {
  host: string;
  port: number;
  password: string;
};
type AwsConfigType = {
  accessKey: string;
  secretKey: string;
};
type SentryConfigType = {
  dsn: string;
  env: string;
  debug: boolean;
};
export {
  ConfigType,
  AppConfigType,
  DatabaseConfigType,
  RedisConfigType,
  AwsConfigType,
  SentryConfigType,
};
