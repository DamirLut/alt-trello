import { resolve } from 'path';

export const enum FileSize {
  Kb = 1024,
  Mb = 1024 * 1024,
}

/// maybe get its from env file ?
export const UPLOAD_PATH = resolve('../../uploads');
