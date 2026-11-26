// Usage: tsx scripts/fetch/resolve-titles.ts "Title A" "Title B" ...  (batched, max 50)
import { getJson } from './http.ts';
const titles = process.argv.slice(2);
const q = new URLSearchParams({ action: 'query', titles: titles.join('|'), redirects: '1', format: 'json', formatversion: '2' });
const j: any = await getJson(`https://en.wikipedia.org/w/api.php?${q}`);
const redir = new Map<string, string>((j.query.redirects ?? []).map((r: any) => [r.from, r.to]));
const norm = new Map<string, string>((j.query.normalized ?? []).map((r: any) => [r.from, r.to]));
for (const t of titles) {
  const n = norm.get(t) ?? t;
  const to = redir.get(n) ?? n;
  const page = j.query.pages.find((p: any) => p.title === to);
  console.log(`${page?.missing ? 'MISSING' : 'ok     '} ${t}${to !== t ? '  ->  ' + to : ''}`);
}
