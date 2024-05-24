import { Migration } from '@mikro-orm/migrations';

export class Migration20240524131625 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "boards" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "title" varchar(255) not null, "owner_id" int not null, constraint "boards_pkey" primary key ("id"));',
    );

    this.addSql(
      'alter table "boards" add constraint "boards_owner_id_foreign" foreign key ("owner_id") references "users" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "boards" cascade;');
  }
}
