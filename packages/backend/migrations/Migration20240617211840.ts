import { Migration } from '@mikro-orm/migrations';

export class Migration20240617211840 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "board-members" drop constraint "board-members_board_id_foreign";',
    );

    this.addSql(
      'alter table "cards" add column "labels" jsonb not null default \'[]\';',
    );

    this.addSql(
      'alter table "board-members" add constraint "board-members_board_id_foreign" foreign key ("board_id") references "boards" ("id") on update cascade on delete cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "board-members" drop constraint "board-members_board_id_foreign";',
    );

    this.addSql('alter table "cards" drop column "labels";');

    this.addSql(
      'alter table "board-members" add constraint "board-members_board_id_foreign" foreign key ("board_id") references "boards" ("id") on update cascade;',
    );
  }
}
