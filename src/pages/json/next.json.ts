import type { APIRoute } from 'astro';
import { getNext } from '../../lib/data';

// 現行の `site.data.next | jsonify` 相当。配列構造をそのまま保持する。
export const prerender = true;

export const GET: APIRoute = () => Response.json(getNext());
