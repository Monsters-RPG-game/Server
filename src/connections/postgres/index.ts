import knex from 'knex';
import Log from 'simpl-loggar';
import ConfigLoader from '../../tools/config/index.js';

export default class Mysql {
  private _knex: knex.Knex | undefined;

  private get knex(): knex.Knex {
    return this._knex as knex.Knex;
  }

  private set knex(value: knex.Knex) {
    this._knex = value;
  }

  @Log.decorateLog('Knex', 'Connection open')
  init(): void {
    this.knex = knex({
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
      },
      pool: {
        min: 5,
        max: 20,
      },
    });
  }

  getClient(): knex.Knex {
    return this.knex;
  }

  @Log.decorateLog('Knex', 'Connection closed')
  close(): void {
    if (this.knex) {
      this.knex.destroy().catch(() => {
        // Ignored
      });
    }
  }
}
