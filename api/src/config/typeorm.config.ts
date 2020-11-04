import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbCfg = config.get('db');

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: dbCfg.type,
  host: dbCfg.host,
  port: dbCfg.port,
  username: dbCfg.user,
  password: dbCfg.password,
  database: dbCfg.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: dbCfg.synchronize,
};
