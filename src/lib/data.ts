import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';

/** 各回で読んだ vimrc ファイル 1 件。古い項目と新しい項目で持つキーが異なる。 */
export type Vimrc = {
  name: string;
  url: string;
  raw_url?: string;
  hash?: string;
};

export type Author = {
  name: string;
  url?: string;
};

/** `_data/archives.yml` の 1 開催分。 */
export type Archive = {
  id: number;
  date: string;
  author: Author;
  vimrcs: Vimrc[];
  part?: string | null;
  other?: string | null;
  members: string[];
  log: string;
  links?: string[];
};

/** `_data/next.yml` の次回予告 1 件。 */
export type Next = {
  id: number;
  date: string;
  author: Author;
  vimrcs: Vimrc[];
  part?: string | null;
  other?: string | null;
};

// `_data/` は Jekyll 時代の配置を維持する（プロジェクトルート直下）。
const dataDir = new URL('../../_data/', import.meta.url);

function load<T>(name: string): T {
  const path = fileURLToPath(new URL(name, dataDir));
  // eemeli/yaml は YAML 1.2 core schema なので `2012-07-10 23:00` を文字列のまま保持する。
  // Date 化するとタイムゾーンで日付がずれるため、文字列で扱うことが再現性の要になる。
  return parse(readFileSync(path, 'utf-8')) as T;
}

/** 全開催を id 昇順（YAML 記述順）で返す。 */
export function getArchives(): Archive[] {
  return load<Archive[]>('archives.yml');
}

/** 次回予告のリストを返す。現行同様、先頭要素が直近の予告。 */
export function getNext(): Next[] {
  return load<Next[]>('next.yml');
}
