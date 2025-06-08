import ConfigLoader from '../tools/config/index.js';

export default {
  client: 'pg',
  connection: {
    host: ConfigLoader.getConfig().postgres.host,
    user: ConfigLoader.getConfig().postgres.user,
    password: ConfigLoader.getConfig().postgres.password,
    database: ConfigLoader.getConfig().postgres.db,
    port: ConfigLoader.getConfig().postgres.port,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './actions',
  },
};
