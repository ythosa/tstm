"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const config = require("config");
const dbCfg = config.get('db');
exports.typeOrmConfig = {
    type: dbCfg.type,
    host: dbCfg.host,
    port: dbCfg.port,
    username: dbCfg.user,
    password: dbCfg.password,
    database: dbCfg.database,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: dbCfg.synchronize,
};
//# sourceMappingURL=typeorm.config.js.map