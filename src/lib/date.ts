// 現行 Jekyll は Liquid の `date` フィルタと case 文で曜日を日本語化していた。
// 同一ロジックが _includes/archive.md・archive/index.md・index.md の 3 箇所に散在して
// いたため、1 つの関数に集約する。

const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'] as const;

const DATE_PATTERN = /^(\d{4})-(\d{1,2})-(\d{1,2})[ T](\d{1,2}):(\d{2})/;

function pad2(n: number): string {
  return String(n).padStart(2, '0');
}

/**
 * `"2012-07-10 23:00"` 形式の日時文字列を `"2012/07/10 (火) 23:00"` に整形する。
 *
 * 曜日は `Date.UTC` 固定で算出し、実行環境のローカルタイムゾーンの影響を排除する
 * （現行の日付表示を正確に再現するため）。
 */
export function formatDate(date: string): string {
  const matched = date.match(DATE_PATTERN);
  if (matched === null) {
    throw new Error(`Unexpected date format: ${date}`);
  }
  const [, year, month, day, hour, minute] = matched;
  const weekday = WEEKDAYS[
    new Date(Date.UTC(Number(year), Number(month) - 1, Number(day))).getUTCDay()
  ];
  return `${year}/${pad2(Number(month))}/${pad2(Number(day))} (${weekday}) ${pad2(Number(hour))}:${minute}`;
}
