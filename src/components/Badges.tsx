import { Badge } from '@/components/ui/badge';
import { useApp } from '@/app/context';
import { Tip } from './Tip';
import { cn } from '@/lib/utils';
import { CircleCheck, CircleHelp, TriangleAlert } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const CONF = {
  stated: { label: 'Stated', icon: CircleCheck, cls: 'border-emerald-400/60 text-emerald-200', help: 'A source states this date explicitly.' },
  inferred: { label: 'Inferred', icon: CircleHelp, cls: 'border-sky-400/60 text-sky-200', help: 'Derived from tie-ins or other evidence; see note.' },
  disputed: { label: 'Disputed', icon: TriangleAlert, cls: 'border-amber-400/70 text-amber-200', help: 'Sources disagree (both values are given below) or are shaky.' },
} as const;

/** Confidence badge. With a note, the tooltip also says where the date comes from (spoiler-safe aware). */
export function ConfidenceBadge({ c, small, note, unitKey }: { c: keyof typeof CONF; small?: boolean; note?: string; unitKey?: string }) {
  const { spoilerSafe, watched } = useApp();
  const x = CONF[c];
  const hideNote = spoilerSafe && unitKey !== undefined && !watched.set.has(unitKey);
  const Icon = x.icon;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge variant="outline" className={cn('cursor-help gap-1', x.cls, small && 'h-5 px-1.5')}>
          <Icon aria-hidden className="size-3" />
          {x.label}
        </Badge>
      </TooltipTrigger>
      <TooltipContent className="max-w-sm">
        <div className="space-y-1">
          <div><strong className="font-semibold">{x.label}:</strong> {x.help}</div>
          {note && (hideNote ? <div className="opacity-80">Source note hidden (spoiler-safe mode).</div> : <div className="opacity-90">{note}</div>)}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}

/** Studio badge that keeps same-named entities (e.g. the two Marvel Televisions) visibly distinct. */
export function StudioBadge({ studio, label, studioLabel, studioShort, labelLabel, parentOfLabel }: {
  studio: string; label: string | null; studioLabel: string; studioShort: string; labelLabel?: string; parentOfLabel?: string;
}) {
  if (label && labelLabel) {
    return (
      <Tip content={labelLabel}><span className="inline-flex flex-wrap items-center gap-1 text-sm">
        <Badge variant="secondary">{parentOfLabel ?? studioShort}</Badge>
        <span aria-hidden className="text-muted-foreground">›</span>
        <Badge variant="outline" className="border-primary/60">{labelLabel}</Badge>
      </span></Tip>
    );
  }
  return <Tip content={studioLabel}><Badge variant="outline" className="border-dashed" data-studio={studio}>{studioLabel}</Badge></Tip>;
}
