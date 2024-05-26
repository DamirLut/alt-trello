import { Migration } from '@mikro-orm/migrations';

export class Migration20240526204704 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "columns" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "title" varchar(255) not null, "board_id" varchar(255) not null, "position" int not null);',
    );

    this.addSql(
      'create table "cards" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "title" varchar(255) not null, "column_id" int not null, "position" int not null);',
    );

    this.addSql(
      'alter table "columns" add constraint "columns_board_id_foreign" foreign key ("board_id") references "boards" ("id") on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "cards" add constraint "cards_column_id_foreign" foreign key ("column_id") references "columns" ("id") on update cascade on delete cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "cards" drop constraint "cards_column_id_foreign";',
    );

    this.addSql('drop table if exists "columns" cascade;');

    this.addSql('drop table if exists "cards" cascade;');
  }
}
