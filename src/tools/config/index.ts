import Log from 'simpl-loggar';
import { EConfigEnvs, EConfigKeys } from './enums.js';
import { InvalidConfigError } from '../../errors/index.js';
import type * as types from '../../types/index.js';
import fs from 'fs';

export default class ConfigLoader {
  private static _config: types.IConfig | undefined;

  private static get config(): types.IConfig | undefined {
    return ConfigLoader._config;
  }

  private static set config(val: types.IConfig) {
    ConfigLoader._config = val;
  }

  /**
   * Load config from json files.
   * @returns Config loaded from file.
   * @throws Error that no config was found.
   */
  static getConfig(): types.IConfig {
    if (ConfigLoader.config) return ConfigLoader.config;

    try {
      let config: Partial<types.IConfig> = {};

      switch (process.env.NODE_ENV) {
        case 'development':
        case 'test':
          config = JSON.parse(fs.readFileSync('./config/devConfig.json').toString()) as types.IConfig;
          break;
        case 'production':
          config = JSON.parse(fs.readFileSync('./config/prodConfig.json').toString()) as types.IConfig;
          break;
        default:
          throw new Error('No config files');
      }

      config = ConfigLoader.loadFromEnv(config);
      ConfigLoader.preValidate(config);

      return config as types.IConfig;
    } catch (err) {
      Log.error('Config loader', 'Got error while reading config files', (err as Error).message);
      throw new InvalidConfigError((err as Error).message);
    }
  }

  /**
   * Validate if config is correct.
   */
  static validateConfig(): void {
    ConfigLoader.getConfig();
  }

  /**
   * Validate if config includes all required keys.
   * @param config {types.IConfigInterface} Config.
   * @returns {void} Void.
   */
  private static preValidate(config: Partial<types.IConfig>): void {
    const configKeys = Object.values(EConfigKeys);

    configKeys.forEach((k) => {
      if (k.includes('.')) {
        // Spli key for nested values and validate
        const split = k.split('.');
        if (
          split.reduce<Record<string, unknown>>(
            (acc, key) => acc?.[key as keyof types.IConfig] as Record<string, unknown>,
            config,
          ) === undefined ||
          config[k as keyof types.IConfig] === null
        ) {
          throw new Error(`Config is incorrect. ${k} is missing in config or is set to undefined`);
        }
      } else {
        if (config[k as keyof types.IConfig] === undefined || config[k as keyof types.IConfig] === null) {
          throw new Error(`Config is incorrect. ${k} is missing in config or is set to undefined`);
        }
      }
    });
  }

  /**
   * Prefill configuration files with env.
   * @description Prefill configuration file with ENVS provided in system.
   * @param config Existing configuration, loaded from files.
   */
  private static loadFromEnv(config: Partial<types.IConfig>): Partial<types.IConfig> {
    const envKeys = Object.keys(EConfigEnvs);

    envKeys.forEach((k) => {
      const key = EConfigKeys[k as EConfigEnvs];
      const target = process.env[k as EConfigEnvs];

      if (target === undefined || target.length === 0) return;

      switch (key) {
        case EConfigKeys.PORT:
          config[key] = Number(target);
          break;
        case EConfigKeys.CORS_ORIGIN:
          config[key] = target.split(',');
          break;
        case EConfigKeys.TRUST_PROXY:
          config[key] = Boolean(target);
          break;
        case EConfigKeys.POSTGRES_PORT:
          config.postgres!.port = Number(target);
          break;
        case EConfigKeys.POSTGRES_PASSWORD:
          config.postgres!.password = target;
          break;
        case EConfigKeys.POSTGRES_USER:
          config.postgres!.user = target;
          break;
        case EConfigKeys.POSTGRES_DB:
          config.postgres!.db = target;
          break;
        case EConfigKeys.POSTGRES_HOST:
          config.postgres!.host = target;
          break;
        default:
          config[key] = target;
          break;
      }
    });

    return config;
  }
}
