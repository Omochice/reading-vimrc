// Astro は href に base path を自動付与しない。全リンク・資産参照をこのヘルパ経由に
// することで `/reading-vimrc` 配信時の 404（base 付与漏れ）を防ぐ。

/**
 * base path（`import.meta.env.BASE_URL`）を前置した絶対パスを返す。
 *
 * @example withBase('/images/logo.png') // => '/reading-vimrc/images/logo.png'
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const suffix = path.startsWith('/') ? path : `/${path}`;
  return `${base}${suffix}`;
}

/** 開催 id を 3 桁ゼロ埋め文字列にする（`1` => `"001"`）。 */
export function zeroPad(id: number): string {
  return String(id).padStart(3, '0');
}
