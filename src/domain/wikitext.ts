// Turn wikitext fragments quoted from Wikipedia (e.g. "{{Start date|2013|9|17}}", "[[Los Santos|LS]]",
// "'''PS4'''") into plain reading text. Used by the data migration that cleans quoted notes, and by tests.
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function ymd(y?: string, m?: string, d?: string): string {
  const Y = (y ?? '').trim(), M = Number((m ?? '').trim()), D = Number((d ?? '').trim());
  if (!/^\d{3,4}$/.test(Y)) return [y, m, d].filter(Boolean).join(' ');
  if (!M || M < 1 || M > 12) return Y;
  return D ? `${MONTHS[M - 1]} ${D}, ${Y}` : `${MONTHS[M - 1]} ${Y}`;
}

/** Expand one template (without braces). Unknown templates are dropped (maintenance tags, footnotes). */
function expand(inner: string): string {
  const parts = inner.split('|');
  const name = parts[0]!.trim().toLowerCase().replace(/_/g, ' ');
  const pos = parts.slice(1).filter((p) => !/^\s*[\w -]+\s*=/.test(p)).map((p) => p.trim());
  if (/^(start date|end date|start date and age|end date and age|birth date|release date|dts)$/.test(name)) return ymd(pos[0], pos[1], pos[2]);
  if (name === 'film date') {
    const out: string[] = [];
    for (let i = 0; i < pos.length; ) {
      const date = ymd(pos[i], pos[i + 1], pos[i + 2]);
      const place = pos[i + 3] && !/^\d+$/.test(pos[i + 3]!) ? pos[i + 3] : '';
      out.push(place ? `${date} (${place})` : date);
      i += place ? 4 : 3;
    }
    return out.filter(Boolean).join('; ');
  }
  if (name === 'video game release' || name === 'vgrelease' || name === 'vgr') {
    const out: string[] = [];
    for (let i = 0; i + 1 < pos.length; i += 2) out.push(`${pos[i]}: ${pos[i + 1]}`);
    return out.join('; ');
  }
  if (/^(ubl|unbulleted list|plainlist|flatlist|hlist|bulleted list)$/.test(name)) return pos.filter(Boolean).join(', ');
  if (/^(nobold|nowrap|small|big|nobr|lang|transl|em|strong|abbr|sic|noitalic)$/.test(name)) {
    if (name === 'lang' || name === 'transl') return pos[1] ?? '';
    return pos[0] ?? '';
  }
  if (name === 'circa' || name === 'c.') return `c. ${pos[0] ?? ''}`.trim();
  // Notes quote a fan wiki's banner as "carries a {{Dispute}} banner": keep the word.
  if (name === 'dispute' || name === 'disputed') return 'dispute';
  return '';
}

export function plainWikitext(s: string): string {
  if (!/\{\{|\[\[|''|<ref|<br|&nbsp;/.test(s)) return s;
  let t = s
    .replace(/<ref[^>]*\/>/gi, '')
    .replace(/<ref[^>]*>[\s\S]*?<\/ref>/gi, '')
    .replace(/<br\s*\/?>/gi, '; ')
    .replace(/&nbsp;/g, ' ');
  // innermost templates first, until none are left
  for (let i = 0; i < 10 && /\{\{[^{}]*\}\}/.test(t); i++) t = t.replace(/\{\{([^{}]*)\}\}/g, (_, inner: string) => expand(inner));
  t = t
    .replace(/\[\[(?:[^|\]]*\|)?([^\]]*)\]\]/g, '$1')
    .replace(/'''''|'''|''/g, '')
    .replace(/\{\{|\}\}/g, '')
    .replace(/\s*;\s*(;\s*)+/g, '; ')
    .replace(/\(\s*\)/g, '')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\s+([,.;:)])/g, '$1')
    .trim();
  return t;
}
