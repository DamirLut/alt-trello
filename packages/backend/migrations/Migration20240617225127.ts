import { Migration } from '@mikro-orm/migrations';

export class Migration20240617225127 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "authorizations" drop constraint "authorizations_user_id_foreign";',
    );

    this.addSql(
      'alter table "authorizations" add constraint "authorizations_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade on delete cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "authorizations" drop constraint "authorizations_user_id_foreign";',
    );

    this.addSql(
      'alter table "authorizations" add constraint "authorizations_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;',
    );
  }
}
