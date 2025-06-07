export interface IConfig {
  myAddress: string;
  corsOrigin: string[];
  port: number;
  trustProxy: boolean;
  repository: string;
  postgres: {
    user: string;
    password: string;
    host: string;
    db: string;
    port: number;
  };
}
