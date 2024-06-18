import { Migration } from '@mikro-orm/migrations';

export class Migration20240618014420 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "card-members" drop constraint "card-members_card_id_foreign";',
    );

    this.addSql(
      'alter table "card-members" add constraint "card-members_card_id_foreign" foreign key ("card_id") references "cards" ("id") on update cascade on delete cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "card-members" drop constraint "card-members_card_id_foreign";',
    );

    this.addSql(
      'alter table "card-members" add constraint "card-members_card_id_foreign" foreign key ("card_id") references "cards" ("id") on update cascade;',
    );
  }
}
