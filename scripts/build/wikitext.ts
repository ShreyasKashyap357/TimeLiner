// Minimal, dependency-free wikitext helpers: enough to read infobox-style templates
// ({{Film overview}}, {{Series overview}}, timeline rows) and clean display text.

export interface Template {
  name: string;
  params: Record<string, string>; // named params; positional params are "1", "2", ...
  raw: string;
  offset: number;
}

/** Remove <ref>…</ref>, <ref …/>, HTML comments and <includeonly>/<noinclude> wrappers. */
export function stripNoise(src: string): string {
  return src
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<ref[^>]*\/>/g, '')
    .replace(/<ref[^>]*>[\s\S]*?<\/ref>/g, '')
    .replace(/<\/?(includeonly|noinclude|onlyinclude)>/g, '');
}

/** Find every top-level-or-nested template whose name matches `nameRe`. */
export function findTemplates(src: string, nameRe: RegExp): Template[] {
  const out: Template[] = [];
  for (let i = 0; i < src.length - 1; i++) {
    if (src[i] !== '{' || src[i + 1] !== '{') continue;
    const end = matchBraces(src, i);
    if (end < 0) continue;
    const raw = src.slice(i, end);
    const t = parseTemplate(raw, i);
    if (t && nameRe.test(t.name)) out.push(t);
  }
  return out;
}

/** Return index just past the matching "}}" for the "{{" at `start`, or -1. */
export function matchBraces(src: string, start: number): number {
  let depth = 0;
  for (let i = start; i < src.length - 1; i++) {
    if (src[i] === '{' && src[i + 1] === '{') { depth++; i++; continue; }
    if (src[i] === '}' && src[i + 1] === '}') {
      depth--; i++;
      if (depth === 0) return i + 1;
    }
  }
  return -1;
}

export function parseTemplate(raw: string, offset = 0): Template | null {
  if (!raw.startsWith('{{') || !raw.endsWith('}}')) return null;
  const inner = raw.slice(2, -2);
  const parts = splitTopLevel(inner, '|');
  const name = (parts.shift() ?? '').trim();
  const params: Record<string, string> = {};
  let pos = 1;
  for (const p of parts) {
    const eq = topLevelIndexOf(p, '=');
    if (eq >= 0 && /^[\w\s-]+$/.test(p.slice(0, eq).trim())) {
      params[p.slice(0, eq).trim()] = p.slice(eq + 1).trim();
    } else {
      params[String(pos++)] = p.trim();
    }
  }
  return { name, params, raw, offset };
}

function splitTopLevel(s: string, sep: string): string[] {
  const out: string[] = [];
  let depthT = 0, depthL = 0, last = 0;
  for (let i = 0; i < s.length; i++) {
    const two = s.slice(i, i + 2);
    if (two === '{{') { depthT++; i++; continue; }
    if (two === '}}') { depthT--; i++; continue; }
    if (two === '[[') { depthL++; i++; continue; }
    if (two === ']]') { depthL--; i++; continue; }
    if (s[i] === sep && depthT === 0 && depthL === 0) { out.push(s.slice(last, i)); last = i + 1; }
  }
  out.push(s.slice(last));
  return out;
}

function topLevelIndexOf(s: string, ch: string): number {
  let depthT = 0, depthL = 0;
  for (let i = 0; i < s.length; i++) {
    const two = s.slice(i, i + 2);
    if (two === '{{') { depthT++; i++; continue; }
    if (two === '}}') { depthT--; i++; continue; }
    if (two === '[[') { depthL++; i++; continue; }
    if (two === ']]') { depthL--; i++; continue; }
    if (s[i] === ch && depthT === 0 && depthL === 0) return i;
  }
  return -1;
}

/** First wikilink target in a fragment, e.g. "[[Thor (film)|Thor]]" -> "Thor (film)". */
export function firstLinkTarget(s: string): string | null {
  const m = /\[\[([^\]|#]+)(?:#[^\]|]*)?(?:\|[^\]]*)?\]\]/.exec(s);
  return m ? m[1]!.trim() : null;
}

/** Turn a wikitext fragment into plain display text. */
export function cleanText(s: string): string {
  let t = stripNoise(s);
  // drop efn / ref-like templates entirely
  t = t.replace(/\{\{\s*(efn|sfn|refn|Efn)[^{}]*(\{\{[^{}]*\}\}[^{}]*)*\}\}/g, '');
  // common inline templates
  t = t.replace(/\{\{\s*abbr\s*\|([^|}]*)\|[^}]*\}\}/gi, '$1');
  t = t.replace(/\{\{\s*(hairsp|'s)\s*\}\}/gi, (_m, g) => (g === "'s" ? "'s" : ''));
  t = t.replace(/\{\{\s*(?:Indented plainlist|nowrap|small)\s*\|([\s\S]*?)\}\}/gi, '$1');
  t = t.replace(/\{\{\s*N\/?a\s*\}\}/gi, '');
  // links
  t = t.replace(/\[\[(?:[^\]|]*\|)?([^\]]*)\]\]/g, '$1');
  t = t.replace(/\[https?:\/\/\S+\s([^\]]*)\]/g, '$1');
  // any remaining templates
  for (let guard = 0; guard < 5 && /\{\{[^{}]*\}\}/.test(t); guard++) t = t.replace(/\{\{[^{}]*\}\}/g, '');
  t = t.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '');
  t = t.replace(/'''?/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
  return t;
}

/** Parse {{Start date|2023|6|21}} / {{Film date|...}} / plain "2023" into ISO (yyyy, yyyy-mm, yyyy-mm-dd). */
export function parseDateTemplate(s: string | undefined): string | null {
  if (!s) return null;
  const t = findTemplates(s, /^(Start date|End date|Film date|start date|end date|Dts|dts)$/i)[0];
  if (t) {
    const [y, m, d] = [t.params['1'], t.params['2'], t.params['3']].map((x) => (x ? x.trim() : ''));
    if (!y || !/^\d{4}$/.test(y)) return null;
    if (!m) return y;
    const mm = String(Number(m)).padStart(2, '0');
    if (!d) return `${y}-${mm}`;
    return `${y}-${mm}-${String(Number(d)).padStart(2, '0')}`;
  }
  const plain = cleanText(s);
  const y = /\b(1[89]\d\d|20\d\d)\b/.exec(plain);
  return y ? y[1]! : null;
}
