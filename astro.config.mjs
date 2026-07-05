import { defineConfig } from 'astro/config';

// URL 構造を現行 Jekyll と完全一致させるための設定。
// build.format:'preserve' はソースのファイル構造をそのまま保つ。
//   archive/[id].astro   -> archive/001.html   （現行 URL 維持）
//   archive/index.astro  -> archive/index.html （'file' だと archive.html に潰れてしまう）
//   stat/index.astro     -> stat/index.html    （angular の templateUrl 相対解決に必要）
export default defineConfig({
  site: 'https://omochice.github.io',
  base: '/reading-vimrc',
  build: {
    format: 'preserve',
  },
});
