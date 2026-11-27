// Parser for the English Wikipedia `{{Infobox video game}}` `| released =` field (R-52).
// Output: the earliest date per platform across regions, with the region it was first released in.
//
// The field mixes platform headers ('''PlayStation 4''', '''PS4, Xbox One''') with dates, either inside
// {{Video game release|NA|date|EU|date}} or as plain text. A date belongs to the platform header(s) above it.
// Rules (data/DATA_NOTES.md, "Per-platform release dates"):
//  - Consecutive headers accumulate ('''PS3''', '''Xbox 360''' then dates).
//  - A bold label that is not a platform ('''''Remastered''''', '''Episode 1''') ends the current header group.
//  - Dates with no header are attributed only when the infobox lists exactly one platform; otherwise they are
//    reported as unattributed and not recorded (the article does not say which platform they are for).
//  - If unattributed dates exist, dates after an edition label are dropped too: the edition's date could be
//    later than an unattributed original release on the same platform.
//  - A parenthetical platform qualifier after a date ("9 November 2007 (X360, PS3)") limits that date to those
//    platforms, within the current header group.
//  - Partial dates (yyyy-mm, yyyy) only win when their whole period is earlier than a full date.

export interface PlatformRelease { platform: string; date: string; region: string | null; source_url: string }

/** Lower-cased Wikipedia platform names/abbreviations → platform registry id. */
export const PLATFORM_ALIASES: Record<string, string> = {
  // Microsoft
  'windows': 'windows', 'microsoft windows': 'windows', 'win': 'windows', 'pc': 'windows', 'windows pc': 'windows',
  'ms-dos': 'ms-dos', 'dos': 'ms-dos',
  'xbox': 'xbox', 'xbox 360': 'xbox-360', 'x360': 'xbox-360', 'xb360': 'xbox-360',
  'xbox one': 'xbox-one', 'xone': 'xbox-one', 'xbo': 'xbox-one', 'xb1': 'xbox-one',
  'xbox series x/s': 'xbox-series', 'xbox series x and series s': 'xbox-series', 'xbox series x': 'xbox-series',
  'series x/s': 'xbox-series', 'xsx/s': 'xbox-series', 'xsx': 'xbox-series', 'xbox series': 'xbox-series',
  'windows phone': 'windows-phone', 'windows phone 7': 'windows-phone', 'windows phone 8': 'windows-phone',
  // Sony
  'playstation': 'playstation', 'ps1': 'playstation', 'psx': 'playstation',
  'playstation 2': 'playstation-2', 'ps2': 'playstation-2',
  'playstation 3': 'playstation-3', 'ps3': 'playstation-3',
  'playstation 4': 'playstation-4', 'ps4': 'playstation-4',
  'playstation 5': 'playstation-5', 'ps5': 'playstation-5',
  'playstation portable': 'playstation-portable', 'psp': 'playstation-portable',
  'playstation vita': 'playstation-vita', 'ps vita': 'playstation-vita', 'vita': 'playstation-vita', 'psv': 'playstation-vita',
  'playstation vr': 'playstation-vr', 'psvr': 'playstation-vr', 'playstation vr2': 'playstation-vr2', 'psvr2': 'playstation-vr2',
  // Nintendo
  'nintendo 64': 'nintendo-64', 'n64': 'nintendo-64',
  'gamecube': 'gamecube', 'nintendo gamecube': 'gamecube', 'gc': 'gamecube', 'gcn': 'gamecube',
  'wii': 'wii', 'wii u': 'wii-u',
  'nintendo switch': 'switch', 'switch': 'switch', 'ns': 'switch',
  'nintendo switch 2': 'switch-2', 'switch 2': 'switch-2',
  'game boy color': 'game-boy-color', 'gbc': 'game-boy-color',
  'game boy advance': 'game-boy-advance', 'gba': 'game-boy-advance',
  'nintendo ds': 'nintendo-ds', 'ds': 'nintendo-ds', 'nds': 'nintendo-ds',
  'nintendo 3ds': 'nintendo-3ds', '3ds': 'nintendo-3ds',
  // Sega
  'dreamcast': 'dreamcast', 'sega dreamcast': 'dreamcast',
  // Apple
  'mac os x': 'macos', 'os x': 'macos', 'osx': 'macos', 'macos': 'macos', 'mac': 'macos',
  'mac os': 'classic-mac-os', 'classic mac os': 'classic-mac-os',
  'ios': 'ios', 'ipados': 'ipados', 'tvos': 'tvos', 'visionos': 'visionos',
  // Others
  'android': 'android', 'linux': 'linux', 'fire os': 'fire-os', 'webos': 'webos', 'symbian': 'symbian',
  'j2me': 'j2me', 'java 2 me': 'j2me', 'java me': 'j2me', 'n-gage': 'n-gage', 'mobile': 'mobile-phone', 'mobile phone': 'mobile-phone',
  'stadia': 'stadia', 'google stadia': 'stadia', 'arcade': 'arcade', 'facebook gaming': 'facebook-gaming',
  'meta quest': 'meta-quest', 'oculus quest': 'meta-quest', 'oculus quest 2': 'meta-quest', 'meta quest 2': 'meta-quest',
  'meta quest 3': 'meta-quest', 'meta quest 3s': 'meta-quest', 'meta quest pro': 'meta-quest', 'meta quest 2, 3, pro': 'meta-quest',
  'oculus rift': 'oculus-rift', 'oculus rift s': 'oculus-rift',
};

const norm = (s: string) => s.replace(/[:\s]+$/, '').replace(/\s+/g, ' ').trim().toLowerCase();

/** Map a header like "PS4, Windows & Xbox One" to platform ids. `unknown` lists the parts that are not platforms. */
export function platformsOf(label: string): { ids: string[]; unknown: string[] } {
  const whole = norm(label);
  if (PLATFORM_ALIASES[whole]) return { ids: [PLATFORM_ALIASES[whole]], unknown: [] };
  const ids: string[] = [], unknown: string[] = [];
  for (const raw of label.split(/,|&|\band\b|\n/)) {
    const p = norm(raw);
    if (!p) continue;
    const id = PLATFORM_ALIASES[p];
    if (id) { if (!ids.includes(id)) ids.push(id); } else unknown.push(raw.trim());
  }
  return { ids, unknown };
}

const MONTHS = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
const pad = (n: number | string) => String(n).padStart(2, '0');
const monthNo = (m: string) => MONTHS.indexOf(m.toLowerCase()) + 1;

/** All dates written in a text fragment, as ISO (partial when the text is partial). Bare years only when the text is just a year. */
export function datesIn(text: string): string[] {
  const out: string[] = [];
  const M = '(January|February|March|April|May|June|July|August|September|October|November|December)';
  let rest = text;
  const take = (re: RegExp, f: (m: string[]) => string) => {
    rest = rest.replace(re, (...args: string[]) => { out.push(f(args)); return ' '; });
  };
  take(new RegExp(`${M}\\s+(\\d{1,2}),?\\s+(\\d{4})\\b`, 'gi'), (m) => `${m[3]!}-${pad(monthNo(m[1]!))}-${pad(m[2]!)}`);
  take(new RegExp(`\\b(\\d{1,2})\\s+${M},?\\s+(\\d{4})\\b`, 'gi'), (m) => `${m[3]!}-${pad(monthNo(m[2]!))}-${pad(m[1]!)}`);
  take(new RegExp(`${M},?\\s+(\\d{4})\\b`, 'gi'), (m) => `${m[2]!}-${pad(monthNo(m[1]!))}`);
  if (!out.length) {
    const y = /^\s*(\d{4})\s*$/.exec(text.replace(/\([^)]*\)/g, ''));
    if (y) out.push(y[1]!);
  }
  return out;
}

/** Sort key where a partial date stands for the END of its period (so a full date inside it wins). */
export const endKey = (iso: string) => (iso.length === 4 ? `${iso}-12-31` : iso.length === 7 ? `${iso}-31` : iso);

// ---------------------------------------------------------------------------------------------------------------
// Phase 1: expand templates into flat text with markers.

const DATE_MARK = '\u0001', END_MARK = '\u0002', RESET_MARK = '\u0003';
const RELEASE_TEMPLATES = new Set(['video game release', 'vgrelease', 'vg release', 'vgrelease new', 'video game release new']);
const LIST_TEMPLATES = new Set(['ubl', 'unbulleted list', 'plainlist', 'plain list', 'flatlist', 'hlist', 'collapsible list', 'bulleted list']);
const CONTENT_TEMPLATES = new Set(['nobold', 'nowrap', 'small', 'smaller', 'under', 'resize', 'nobr', 'big', 'abbr']);
const DROP_TEMPLATES = /^(efn|refn|sfn|r|ref|cite|citation|cn|citation needed|better source|verify|clarify|when|update after|as of|dead link|webarchive)\b/i;
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** Split template inner text on depth-0 pipes. */
function splitParams(inner: string): string[] {
  const parts: string[] = [];
  let depth = 0, cur = '';
  for (let i = 0; i < inner.length; i++) {
    const two = inner.slice(i, i + 2);
    if (two === '{{' || two === '[[') { depth++; cur += two; i++; continue; }
    if ((two === '}}' || two === ']]') && depth > 0) { depth--; cur += two; i++; continue; }
    if (inner[i] === '|' && depth === 0) { parts.push(cur); cur = ''; continue; }
    cur += inner[i];
  }
  parts.push(cur);
  return parts;
}

function matchingClose(s: string, start: number): number {
  let depth = 0;
  for (let i = start; i < s.length - 1; i++) {
    if (s[i] === '{' && s[i + 1] === '{') { depth++; i++; } else if (s[i] === '}' && s[i + 1] === '}') { depth--; i++; if (depth === 0) return i + 1; }
  }
  return -1;
}

function expand(s: string, problems: Set<string>): string {
  let out = '';
  let i = 0;
  while (i < s.length) {
    const open = s.indexOf('{{', i);
    if (open < 0) { out += s.slice(i); break; }
    out += s.slice(i, open);
    const close = matchingClose(s, open);
    if (close < 0) { out += s.slice(open); break; }
    out += expandTemplate(s.slice(open + 2, close - 2), problems);
    i = close;
  }
  return out;
}

function expandTemplate(inner: string, problems: Set<string>): string {
  const params = splitParams(inner);
  const name = params[0]!.trim().toLowerCase().replace(/_/g, ' ');
  const positional = params.slice(1).filter((a) => !/^\s*[a-z_]+\s*=/i.test(a));
  if (RELEASE_TEMPLATES.has(name)) {
    if (positional.length === 1) return `${DATE_MARK}|${expand(positional[0]!, problems)}${END_MARK}`;
    let o = '';
    for (let k = 0; k + 1 < positional.length; k += 2) {
      o += `${DATE_MARK}${positional[k]!.trim()}|${expand(positional[k + 1]!, problems).replace(/\n/g, ' ')}${END_MARK}`;
    }
    return o;
  }
  if (LIST_TEMPLATES.has(name)) {
    const reset = name === 'collapsible list' ? RESET_MARK : '';
    return reset + positional.map((p) => expand(p, problems)).join('\n') + '\n';
  }
  if (CONTENT_TEMPLATES.has(name)) return positional.length ? expand(positional[0]!, problems) : '';
  if (/^(start date|start date and age|release date|dts)$/.test(name)) {
    const [y, m, d] = positional.map((p) => p.trim());
    if (/^\d{4}$/.test(y ?? '')) {
      if (m && d) return ` ${MONTH_NAMES[Number(m) - 1]} ${Number(d)}, ${y} `;
      if (m) return ` ${MONTH_NAMES[Number(m) - 1]} ${y} `;
      return ` ${y} `;
    }
    return ' ' + positional.join(' ') + ' ';
  }
  if (DROP_TEMPLATES.test(name)) return '';
  problems.add(`unhandled template {{${params[0]!.trim()}}}`);
  return '';
}

function clean(wikitext: string): string {
  return wikitext
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<ref[^>/]*\/>/gi, '')
    .replace(/<ref[^>]*>[\s\S]*?<\/ref>/gi, '')
    .replace(/&nbsp;|&#160;/g, ' ')
    .replace(/\{\{\s*!\s*\}\}/g, '/');
}

// ---------------------------------------------------------------------------------------------------------------
// Phase 2: walk the flat text.

type Token =
  | { t: 'bold'; text: string }
  | { t: 'date'; region: string | null; text: string }
  | { t: 'text'; text: string }
  | { t: 'reset' };

function tokenize(flat: string): Token[] {
  const tokens: Token[] = [];
  const re = new RegExp(`${DATE_MARK}([^|${END_MARK}]*)\\|([^${END_MARK}]*)${END_MARK}|'''''([\\s\\S]+?)'''''|'''([\\s\\S]+?)'''|${RESET_MARK}`, 'g');
  let last = 0;
  for (let m: RegExpExecArray | null; (m = re.exec(flat)); ) {
    if (m.index > last) tokens.push({ t: 'text', text: flat.slice(last, m.index) });
    if (m[0] === RESET_MARK) tokens.push({ t: 'reset' });
    else if (m[0].startsWith(DATE_MARK)) tokens.push({ t: 'date', region: m[1]!.trim() || null, text: m[2]! });
    else tokens.push({ t: 'bold', text: (m[3] ?? m[4]!).replace(/<br\s*\/?>/gi, '\n') });
    last = re.lastIndex;
  }
  if (last < flat.length) tokens.push({ t: 'text', text: flat.slice(last) });
  return tokens;
}

const stripMarkup = (s: string) =>
  s.replace(/\[\[(?:[^\]|]*\|)?([^\]]*)\]\]/g, '$1').replace(/<[^>]+>/g, ' ').replace(/''/g, '').trim();

/** Platforms named in a parenthetical after a date, e.g. "(X360, PS3)". Empty when none or not all are platforms. */
function qualifierPlatforms(text: string): string[] {
  const out: string[] = [];
  for (const m of stripMarkup(text).matchAll(/\(([^)]*)\)/g)) {
    const { ids, unknown } = platformsOf(m[1]!);
    if (ids.length && !unknown.length) out.push(...ids);
  }
  return out;
}

/** Storefronts and streaming services some infoboxes list next to platforms. */
const STOREFRONTS = new Set(['geforce now', 'microsoft store', 'steam', 'epic games store', 'gog.com']);

/** Platforms listed in the infobox `| platforms =` field. */
export function listedPlatforms(platformsWikitext: string | null): { ids: string[]; unknown: string[] } {
  if (!platformsWikitext) return { ids: [], unknown: [] };
  const problems = new Set<string>();
  // A collapsible list's title is its first platform here; edition labels ('''''Universe in Peril''''') are not platforms.
  const src = clean(platformsWikitext).replace(/\|\s*title\s*=/gi, '|').replace(/'''''[^']*'''''/g, '');
  const flat = stripMarkup(expand(src, problems).replace(/<br\s*\/?>/gi, '\n').replace(/[\u0001-\u0003]/g, ''))
    .replace(/'''?/g, '').replace(/^\s*\*\s*/gm, '').replace(/\s\*\s/g, '\n').replace(/\(deprecated\)/gi, '');
  const ids: string[] = [], unknown: string[] = [];
  for (const line of flat.split(/\n|,/)) {
    const p = line.trim();
    if (!p || STOREFRONTS.has(p.toLowerCase())) continue;
    const r = platformsOf(p);
    for (const id of r.ids) if (!ids.includes(id)) ids.push(id);
    unknown.push(...r.unknown);
  }
  return { ids, unknown };
}

export function parseReleased(releasedWikitext: string, platformsWikitext: string | null, sourceUrl: string): { releases: PlatformRelease[]; problems: string[] } {
  const problems = new Set<string>();
  const flat = expand(clean(releasedWikitext), problems).replace(/<br\s*\/?>/gi, '\n');
  const tokens = tokenize(flat);
  const listed = listedPlatforms(platformsWikitext);
  const soloPlatform = listed.ids.length === 1 && !listed.unknown.length ? listed.ids[0] : null;

  const best = new Map<string, { date: string; region: string | null }>();
  const record = (platform: string, date: string, region: string | null) => {
    const cur = best.get(platform);
    if (!cur || endKey(date) < endKey(cur.date)) best.set(platform, { date, region });
  };

  let current: string[] = [];
  let lastWasHeader = false;
  let unattributed = 0;
  let afterEditionLabel = false;
  let skipping = false; // under a storefront header ('''Steam'''): not a platform, dates ignored
  let earliestUnattributed: string | null = null;
  const qualifiedOnly: { platform: string; date: string; region: string | null }[] = [];
  const onDate = (text: string, region: string | null) => {
    const dates = datesIn(stripMarkup(text));
    if (!dates.length) return;
    lastWasHeader = false;
    let targets = current;
    const q = qualifierPlatforms(text);
    if (targets.length && q.length) {
      const subset = targets.filter((p) => q.includes(p));
      if (subset.length) targets = subset;
    }
    if (skipping) return;
    if (!targets.length && q.length) {
      // "September 15, 2008 (iOS)" with no header: explicit, but kept only if no unattributed date is earlier (below).
      for (const d of dates) for (const p of q) qualifiedOnly.push({ platform: p, date: d, region });
      return;
    }
    if (!targets.length) {
      if (soloPlatform && !afterEditionLabel) targets = [soloPlatform];
      else { unattributed += dates.length; for (const d of dates) if (!earliestUnattributed || endKey(d) < endKey(earliestUnattributed)) earliestUnattributed = d; return; }
    }
    if (unattributed && afterEditionLabel) return;
    for (const d of dates) for (const p of targets) record(p, d, region);
  };

  for (const tok of tokens) {
    if (tok.t === 'reset') { current = []; lastWasHeader = false; skipping = false; continue; }
    if (tok.t === 'bold') {
      const label = stripMarkup(tok.text);
      if (!label) continue;
      skipping = false;
      if (STOREFRONTS.has(norm(label))) { current = []; lastWasHeader = false; skipping = true; continue; }
      const { ids, unknown } = platformsOf(label);
      if (!ids.length) {
        // An edition / episode label: ends the header group.
        current = []; lastWasHeader = false;
        if (!/^episode\b/i.test(label)) afterEditionLabel = true;
        continue;
      }
      if (unknown.length) problems.add(`unrecognised platform label "${unknown.join(', ')}"`);
      current = lastWasHeader ? [...new Set([...current, ...ids])] : ids;
      lastWasHeader = true;
      continue;
    }
    if (tok.t === 'date') {
      // Some articles put a platform name in the region slot.
      const asPlatform = tok.region ? platformsOf(tok.region) : null;
      if (asPlatform && asPlatform.ids.length && !asPlatform.unknown.length) {
        const saved = current; current = asPlatform.ids; onDate(tok.text, null); current = saved;
      } else onDate(tok.text, tok.region);
      continue;
    }
    // Plain text: line by line, so "Episode I: May 21, 2019" lines are dated individually.
    for (const line of tok.text.split('\n')) if (line.trim()) onDate(line, null);
  }

  for (const r of qualifiedOnly) {
    if (earliestUnattributed && endKey(earliestUnattributed) <= endKey(r.date)) continue;
    record(r.platform, r.date, r.region);
  }
  if (unattributed) {
    problems.add(listed.ids.length > 1
      ? `${unattributed} date(s) not under a platform header (infobox lists ${listed.ids.length} platforms)`
      : `${unattributed} date(s) not attributable to a platform`);
  }
  for (const u of listed.unknown) problems.add(`platform list entry not mapped: "${u}"`);
  const releases = [...best.entries()]
    .map(([platform, v]) => ({ platform, date: v.date, region: v.region, source_url: sourceUrl }))
    .sort((a, b) => endKey(a.date).localeCompare(endKey(b.date)) || a.platform.localeCompare(b.platform));
  return { releases, problems: [...problems] };
}
