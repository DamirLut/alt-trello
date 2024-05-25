import { Migration } from '@mikro-orm/migrations';

export class Migration20240525140503 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "board-settings" ("id" uuid not null default gen_random_uuid(), "data" jsonb not null, constraint "board-settings_pkey" primary key ("id"));',
    );

    this.addSql('alter table "boards" add column "settings_id" uuid null;');
    this.addSql(
      'alter table "boards" add constraint "boards_settings_id_foreign" foreign key ("settings_id") references "board-settings" ("id") on update cascade on delete set null;',
    );
    this.addSql(
      'alter table "boards" add constraint "boards_settings_id_unique" unique ("settings_id");',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "boards" drop constraint "boards_settings_id_foreign";',
    );

    this.addSql('drop table if exists "board-settings" cascade;');

    this.addSql(
      'alter table "boards" drop constraint "boards_settings_id_unique";',
    );
    this.addSql('alter table "boards" drop column "settings_id";');
  }
}
