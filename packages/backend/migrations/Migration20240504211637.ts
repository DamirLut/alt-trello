import { Migration } from '@mikro-orm/migrations';

export class Migration20240504211637 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "users" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "last_active_at" timestamptz not null default now());',
    );
  }
}
