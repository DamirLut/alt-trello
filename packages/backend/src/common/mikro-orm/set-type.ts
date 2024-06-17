import { Type } from '@mikro-orm/core';

export class SetType<T> extends Type<Set<T>, string> {
  convertToDatabaseValue(value: Set<T>): string {
    return JSON.stringify([...value]);
  }
  convertToJSValue(value: string): Set<T> {
    return new Set<T>(value as unknown as T[]);
  }
  toJSON(value: Set<T>) {
    return [...value] as unknown as Set<T>;
  }
  getColumnType(): string {
    return 'jsonb';
  }
}
