import type { APIRoute } from 'astro';
import { getArchives } from '../../lib/data';

// stat SPA が fetch する API エンドポイント。現行の `site.data.archives | jsonify` と
// キー構造を一致させるため、パース結果をそのまま JSON 化する。
export const prerender = true;

export const GET: APIRoute = () => Response.json(getArchives());
