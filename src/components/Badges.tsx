import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CircleCheck, CircleHelp, TriangleAlert } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const CONF = {
  stated: { label: 'Stated', icon: CircleCheck, cls: 'border-emerald-400/60 text-emerald-200', help: 'A source states this date explicitly.' },
  inferred: { label: 'Inferred', icon: CircleHelp, cls: 'border-sky-400/60 text-sky-200', help: 'Derived from tie-ins or other evidence; see note.' },
  disputed: { label: 'Disputed', icon: TriangleAlert, cls: 'border-amber-400/70 text-amber-200', help: 'Sources disagree or are silent; see note.' },
} as const;

export function ConfidenceBadge({ c, small }: { c: keyof typeof CONF; small?: boolean }) {
  const x = CONF[c];
  const Icon = x.icon;
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Badge variant="outline" className={cn('cursor-help gap-1', x.cls, small && 'h-5 px-1.5')}>
          <Icon aria-hidden className="size-3" />
          {x.label}
        </Badge>
      </TooltipTrigger>
      <TooltipContent className="max-w-xs">In-universe date confidence: {x.help}</TooltipContent>
    </Tooltip>
  );
}

/** Studio badge that keeps same-named entities (e.g. the two Marvel Televisions) visibly distinct. */
export function StudioBadge({ studio, label, studioLabel, studioShort, labelLabel, parentOfLabel }: {
  studio: string; label: string | null; studioLabel: string; studioShort: string; labelLabel?: string; parentOfLabel?: string;
}) {
  if (label && labelLabel) {
    return (
      <span className="inline-flex flex-wrap items-center gap-1 text-sm" title={labelLabel}>
        <Badge variant="secondary">{parentOfLabel ?? studioShort}</Badge>
        <span aria-hidden className="text-muted-foreground">›</span>
        <Badge variant="outline" className="border-primary/60">{labelLabel}</Badge>
      </span>
    );
  }
  return <Badge variant="outline" className="border-dashed" title={studioLabel} data-studio={studio}>{studioLabel}</Badge>;
}
