import { Migration } from '@mikro-orm/migrations';

export class Migration20240606223347 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "cards" alter column "id" type text using ("id"::text);',
    );

    this.addSql(
      'alter table "cards" add column "card_id" int not null, add column "board_id" varchar(255) not null, add column "content" jsonb not null;',
    );
    this.addSql('alter table "cards" alter column "id" drop default;');
    this.addSql(
      'alter table "cards" alter column "id" type int using ("id"::int);',
    );
    this.addSql(
      'alter table "cards" add constraint "cards_board_id_foreign" foreign key ("board_id") references "boards" ("id") on update cascade on delete cascade;',
    );
    this.addSql('create sequence if not exists "cards_id_seq";');
    this.addSql(
      'select setval(\'cards_id_seq\', (select max("id") from "cards"));',
    );
    this.addSql(
      'alter table "cards" alter column "id" set default nextval(\'cards_id_seq\');',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "cards" drop constraint "cards_board_id_foreign";',
    );

    this.addSql(
      'alter table "cards" drop column "card_id", drop column "board_id", drop column "content";',
    );

    this.addSql('alter table "cards" alter column "id" drop default;');
    this.addSql(
      'alter table "cards" alter column "id" type uuid using ("id"::text::uuid);',
    );
    this.addSql(
      'alter table "cards" alter column "id" set default gen_random_uuid();',
    );
  }
}
