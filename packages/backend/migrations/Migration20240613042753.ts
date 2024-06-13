import { Migration } from '@mikro-orm/migrations';

export class Migration20240613042753 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "board-members" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "board_id" varchar(255) not null, "user_id" int not null, "permission" jsonb not null default \'[]\');',
    );

    this.addSql(
      'create table "card-members" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "card_id" int not null, "member_id" int not null);',
    );
    this.addSql(
      'alter table "card-members" add constraint "card-members_card_id_unique" unique ("card_id");',
    );

    this.addSql(
      'alter table "board-members" add constraint "board-members_board_id_foreign" foreign key ("board_id") references "boards" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "board-members" add constraint "board-members_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "card-members" add constraint "card-members_card_id_foreign" foreign key ("card_id") references "cards" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "card-members" add constraint "card-members_member_id_foreign" foreign key ("member_id") references "board-members" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "cards" add column "comments" int not null default 0;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "card-members" drop constraint "card-members_member_id_foreign";',
    );

    this.addSql('drop table if exists "board-members" cascade;');

    this.addSql('drop table if exists "card-members" cascade;');

    this.addSql('alter table "cards" drop column "comments";');
  }
}
