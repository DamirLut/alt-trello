import { Migration } from '@mikro-orm/migrations';

export class Migration20240608141407 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "board-settings" ("id" uuid not null default gen_random_uuid(), "data" jsonb not null, constraint "board-settings_pkey" primary key ("id"));',
    );

    this.addSql(
      'create table "users" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "last_active_at" timestamptz not null default now(), "username" varchar(255) not null, "avatar" varchar(255) not null);',
    );

    this.addSql(
      'create table "boards" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "title" varchar(255) not null, "owner_id" int not null, "settings_id" uuid null, constraint "boards_pkey" primary key ("id"));',
    );
    this.addSql(
      'alter table "boards" add constraint "boards_settings_id_unique" unique ("settings_id");',
    );

    this.addSql(
      'create table "columns" ("id" uuid not null default gen_random_uuid(), "created_at" timestamptz not null, "updated_at" timestamptz not null, "title" varchar(255) not null, "board_id" varchar(255) not null, "position" int not null, constraint "columns_pkey" primary key ("id"));',
    );

    this.addSql(
      'create table "cards" ("id" serial primary key, "card_id" int not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "title" varchar(255) not null, "column_id" uuid not null, "board_id" varchar(255) not null, "position" int not null, "content" jsonb not null);',
    );

    this.addSql(
      'create table "authorizations" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "provider_id" varchar(255) not null, "provider" varchar(255) not null, "email" varchar(255) not null, "user_id" int not null);',
    );
    this.addSql(
      'alter table "authorizations" add constraint "authorizations_user_id_unique" unique ("user_id");',
    );

    this.addSql(
      'alter table "boards" add constraint "boards_owner_id_foreign" foreign key ("owner_id") references "users" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "boards" add constraint "boards_settings_id_foreign" foreign key ("settings_id") references "board-settings" ("id") on update cascade on delete set null;',
    );

    this.addSql(
      'alter table "columns" add constraint "columns_board_id_foreign" foreign key ("board_id") references "boards" ("id") on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "cards" add constraint "cards_column_id_foreign" foreign key ("column_id") references "columns" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "cards" add constraint "cards_board_id_foreign" foreign key ("board_id") references "boards" ("id") on update cascade on delete cascade;',
    );

    this.addSql(
      'alter table "authorizations" add constraint "authorizations_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;',
    );
  }
}
