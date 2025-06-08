import { ETableNames } from '../../enums/db.js';
import type knex from 'knex';

export const up = async (knex: knex.Knex): Promise<void> => {
  return knex.schema.createTable(ETableNames.Users, (table) => {
    table.increments('id').primary();
    table.string('login').unique();
  });
};

export const down = async (knex: knex.Knex): Promise<void> => {
  return knex.schema.dropTableIfExists(ETableNames.Users);
};
