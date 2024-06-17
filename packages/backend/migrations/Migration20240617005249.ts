import { Migration } from '@mikro-orm/migrations';

export class Migration20240617005249 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'alter table "users" add column "email" varchar(255) not null default \'\';',
    );
  }

  async down(): Promise<void> {
    this.addSql('alter table "users" drop column "email";');
  }
}
