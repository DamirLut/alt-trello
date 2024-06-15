import { Migration } from '@mikro-orm/migrations';

export class Migration20240615015129 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "user-groups" ("id" serial primary key, "title" varchar(255) not null, "user_id" int not null);',
    );

    this.addSql(
      'create table "user-groups_boards" ("user_group_entity_id" int not null, "board_entity_id" varchar(255) not null, constraint "user-groups_boards_pkey" primary key ("user_group_entity_id", "board_entity_id"));',
    );

    this.addSql(
      'alter table "user-groups" add constraint "user-groups_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "user-groups_boards" add constraint "user-groups_boards_user_group_entity_id_foreign" foreign key ("user_group_entity_id") references "user-groups" ("id") on update cascade on delete cascade;',
    );
    this.addSql(
      'alter table "user-groups_boards" add constraint "user-groups_boards_board_entity_id_foreign" foreign key ("board_entity_id") references "boards" ("id") on update cascade on delete cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql(
      'alter table "user-groups_boards" drop constraint "user-groups_boards_user_group_entity_id_foreign";',
    );

    this.addSql('drop table if exists "user-groups" cascade;');

    this.addSql('drop table if exists "user-groups_boards" cascade;');
  }
}
