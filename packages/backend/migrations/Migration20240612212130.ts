import { Migration } from '@mikro-orm/migrations';

export class Migration20240612212130 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "comments" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "author_id" int not null, "card_id" int null, "comment" varchar(255) not null);',
    );

    this.addSql(
      'alter table "comments" add constraint "comments_author_id_foreign" foreign key ("author_id") references "users" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "comments" add constraint "comments_card_id_foreign" foreign key ("card_id") references "cards" ("id") on delete cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "comments" cascade;');
  }
}
