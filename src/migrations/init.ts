import Log from 'simpl-loggar';
import Postgres from '../connections/postgres/index.js';
import ConfigLoader from '../tools/config/index.js';

class DbInit {
  private _client: Postgres | undefined;

  private get client(): Postgres {
    return this._client as Postgres;
  }

  private set client(value: Postgres) {
    this._client = value;
  }

  close(): void {
    this.client.close();
  }

  async init(): Promise<void> {
    this.initClient();

    try {
      await this.up();
    } catch (err) {
      try {
        Log.error(
          'Init migrations up',
          'Migration died. Incorrect db config ?. Trying rollback',
          (err as Error).message,
        );
        await this.down();
      } catch (error) {
        Log.error('Init migrations', 'Migration died. Incorrect db config ?', (error as Error).message);
        this.close();
      }
    }

    this.close();
  }

  async up(): Promise<void> {
    const dbName = ConfigLoader.getConfig().postgres.db;

    const databases = await this.client
      .getClient()
      .raw<{ rows: [{ '?column?': 1 }] }>('SELECT 1 FROM pg_database WHERE datname = ?', [dbName]);

    if (databases.rows.length < 0 || databases.rows[0]['?column?'] === 1) return;

    await this.client.getClient().raw(`CREATE DATABASE "${dbName}"`);
    Log.log('Init migrations', 'Created new database');
  }

  async down(): Promise<void> {
    await this.client.getClient().raw(`DROP DATABASE IF EXISTS \`${ConfigLoader.getConfig().postgres.db}\``);
  }

  private initClient(): void {
    this.client = new Postgres();
    this.client.init();
  }
}

new DbInit().init().catch((err) => {
  Log.error('Init migrations', 'Migration died. Incorrect db config ?', err);
});
