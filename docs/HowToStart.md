# How to start - docs

Last update: 13.01.2025

This file will try to explain, how to start this project, setup configs and databases.

TLDR;
1. [Config files](#1-config-files)
1. [Env configs](#2-env-configs)

## 1. Config files

This application uses 3 config files:
- devConfig.json
- prodConfig.json
- testConfig.json

DevConfig will be used, if you run your application with NODE_ENV=development. This config should be used while working on this application

ProdConfig will be used, if you run your application with NODE_ENV=production. This should be used in production env

TestConfig will be used, if you run your application on dev servers. This config only differs from production, that in code it will log debug logs and should connect to dev database.

Each config includes few elements:
```json
{
  "port": 5003,
  "myAddress": "http://localhost",
  "corsOrigin": ["http://localhost"],
  "session": {
    "secret": "secret",
    "secured": true
  },
  "postgres": {
    "user": "postgresUser",
    "password": "postgresPassword",
    "host": "host",
    "db": "db",
    "port": 5432
  },
  "diagnostics": {
    "reqTime": false
  }
}
```

Port is port, that application will use

MyAddress is address, that will be used to host this application.

CorsOrigin is list of website that will use this application. If you do not care about it, set ["*"]

Session is config for express session. 

Postgres is postgres config

Diagnostics are diagnostic options, which will help you analyze and debug your operations. It supports few options, like:

- ReqTime - count time for each request. Each time will be logged and will look like this

```json
[09:50:08] Log.TIME: 67fea6a3-6e4c-4467-98db-07d511b446a5 Time passed: 0.01s
[09:50:08] Log.TIME: 67fea6a3-6e4c-4467-98db-07d511b446a5 {
  "path": "/graphql",
  "method": "POST"
}
```

Where UUID v4 is random uuid created for each req. This should also have user's id take from login token ( this is a #TODO )

> [!TIP]
> You can find exampleConfig in `/configs` folder. Place your new configs next to it

## 2. Env configs

Config can also be loaded from env and will take higher priority than config files.

Supported envs:
```yaml
MY_ADDRESS: 'MY_ADDRESS'
PORT: 'PORT'
CORS_ORIGIN: 'CORS_ORIGIN'
TRUST_PROXY: 'TRUST_PROXY'
REPOSITORY: 'REPOSITORY'
POSTGRES_USER: 'POSTGRES_USER'
POSTGRES_PASSWORD: 'POSTGRES_PASSWORD'
POSTGRES_HOST: 'POSTGRES_HOST'
POSTGRES_DB: 'POSTGRES_DB'
POSTGRES_PORT: 'POSTGRES_PORT'
```

Names should be self-explanatory. Only difference between these env and config files is that cors origin expect string joined by `,`. Eg:

```yaml
CORS_ORIGIN: 'address, address2'
```

