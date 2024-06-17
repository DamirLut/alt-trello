import { Migration } from '@mikro-orm/migrations';

export class Migration20240617183126 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "card-members" drop constraint "card-members_member_id_foreign";',
    );

    this.addSql(
      'alter table "boards" add column "description" varchar(255) not null default \'\';',
    );

    this.addSql(
      'alter table "card-members" drop constraint "card-members_card_id_unique";',
    );
    this.addSql('alter table "card-members" drop column "updated_at";');

    this.addSql(
      'alter table "card-members" rename column "member_id" to "user_id";',
    );
    this.addSql(
      'alter table "card-members" add constraint "card-members_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "card-members" drop constraint "card-members_user_id_foreign";',
    );

    this.addSql('alter table "boards" drop column "description";');

    this.addSql(
      'alter table "card-members" add column "updated_at" timestamptz not null;',
    );
    this.addSql(
      'alter table "card-members" rename column "user_id" to "member_id";',
    );
    this.addSql(
      'alter table "card-members" add constraint "card-members_member_id_foreign" foreign key ("member_id") references "board-members" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "card-members" add constraint "card-members_card_id_unique" unique ("card_id");',
    );
  }
}
