import { Migration } from '@mikro-orm/migrations';

export class Migration20240605184742 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "columns" alter column "id" drop default;');
    this.addSql(
      'alter table "columns" alter column "id" type uuid using ("id"::text::uuid);',
    );
    this.addSql(
      'alter table "columns" alter column "id" set default gen_random_uuid();',
    );

    this.addSql('alter table "cards" alter column "id" drop default;');
    this.addSql(
      'alter table "cards" alter column "id" type uuid using ("id"::text::uuid);',
    );
    this.addSql(
      'alter table "cards" alter column "id" set default gen_random_uuid();',
    );
    this.addSql('alter table "cards" alter column "column_id" drop default;');
    this.addSql(
      'alter table "cards" alter column "column_id" type uuid using ("column_id"::text::uuid);',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "columns" alter column "id" type text using ("id"::text);',
    );

    this.addSql(
      'alter table "cards" alter column "id" type text using ("id"::text);',
    );
    this.addSql(
      'alter table "cards" alter column "column_id" type text using ("column_id"::text);',
    );

    this.addSql('alter table "columns" alter column "id" drop default;');
    this.addSql(
      'alter table "columns" alter column "id" type int using ("id"::int);',
    );
    this.addSql('create sequence if not exists "columns_id_seq";');
    this.addSql(
      'select setval(\'columns_id_seq\', (select max("id") from "columns"));',
    );
    this.addSql(
      'alter table "columns" alter column "id" set default nextval(\'columns_id_seq\');',
    );

    this.addSql('alter table "cards" alter column "id" drop default;');
    this.addSql(
      'alter table "cards" alter column "id" type int using ("id"::int);',
    );
    this.addSql(
      'alter table "cards" alter column "column_id" type int using ("column_id"::int);',
    );
    this.addSql('create sequence if not exists "cards_id_seq";');
    this.addSql(
      'select setval(\'cards_id_seq\', (select max("id") from "cards"));',
    );
    this.addSql(
      'alter table "cards" alter column "id" set default nextval(\'cards_id_seq\');',
    );
  }
}
