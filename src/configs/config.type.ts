type ConfigType = {
  app: AppConfigType;
  database: DatabaseConfigType;
  redis: RedisConfigType;
  aws: AwsConfigType;
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

export {
  ConfigType,
  AppConfigType,
  DatabaseConfigType,
  RedisConfigType,
  AwsConfigType,
};
