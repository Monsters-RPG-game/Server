import State from '../../src/tools/state.js';
import MigrationsPostgresConfig from '../../src/migrations/index.js'
import knex from 'knex'
import Router from '../../src/connections/router/index.js';
import Postgres from '../../src/connections/postgres/index.js'
import Bootstrap from '../../src/tools/bootstrap.js';
import Log from 'simpl-loggar';

export default class Utils {
  constructor() {
    State.controllers = new Bootstrap()
    State.postgres = new Postgres()
    State.router = new Router();
  }

  async connect(): Promise<void> {
    State.controllers.init()
    State.postgres.init()
    State.router.init()
  }

  async close(): Promise<void> {
    State.router.close();
    State.postgres.close()
  }

  /**
   * Clean database on tests start
   */
  async cleanup(): Promise<void> {
    try {
      const dbName = MigrationsPostgresConfig.connection.database
      const adminClient = knex({
        ...MigrationsPostgresConfig,
        connection: {
          ...MigrationsPostgresConfig.connection,
          database: 'postgres',
        },
      })

      const databases = await adminClient
        .raw<{ rows: [{ '?column?': 1 }] }>('SELECT 1 FROM pg_database WHERE datname = ?', [dbName]);

      if (databases && (databases?.rows?.length ?? 0) < 0 || databases?.rows?.[0]?.['?column?'] === 1) {
        await adminClient.raw(`DROP DATABASE ${dbName}`)
      }

      await adminClient.raw(`CREATE DATABASE "${dbName}"`);

      const client = knex({...MigrationsPostgresConfig, migrations: {...MigrationsPostgresConfig.migrations, directory: "./src/migrations/actions"}})
      await client.migrate.latest()

      client.destroy()
      adminClient.destroy()
      Log.debug('Test - connections', 'Created test database')
    } catch (err) {
      Log.error('Test - connections', 'Got error while creating database', (err as Error).message, (err as Error).stack)
    }
  }
}

