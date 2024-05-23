import { Migration } from '@mikro-orm/migrations';

export class Migration20240523180611 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "authorizations" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "provider_id" varchar(255) not null, "provider" varchar(255) not null, "email" varchar(255) not null, "user_id" int not null);',
    );
    this.addSql(
      'alter table "authorizations" add constraint "authorizations_user_id_unique" unique ("user_id");',
    );

    this.addSql(
      'alter table "authorizations" add constraint "authorizations_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "users" add column "username" varchar(255) not null, add column "avatar" varchar(255) not null;',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "authorizations" cascade;');

    this.addSql(
      'alter table "users" drop column "username", drop column "avatar";',
    );
  }
}
