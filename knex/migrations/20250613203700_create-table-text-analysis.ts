import type { Knex } from 'knex';
import { TextAnalysisModel } from '../../src/modules/text-analysis/text-analysis.model';

export const up = (knex: Knex): Promise<void> =>
  knex.schema.createTable(
    TextAnalysisModel.tableName,
    (table: Knex.TableBuilder) => {
      table.increments();
      table.text('text').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    },
  );

export const down = (knex: Knex): Promise<void> =>
  knex.schema.dropTable(TextAnalysisModel.tableName);
