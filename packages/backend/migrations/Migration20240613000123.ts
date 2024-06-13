import { Migration } from '@mikro-orm/migrations';

export class Migration20240613000123 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "cards" add column "cover" varchar(255) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "cards" drop column "cover";');
  }
}
