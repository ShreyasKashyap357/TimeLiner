import { useState } from 'react';
import { useApp } from '@/app/context';
import { EyeOff } from 'lucide-react';

/** Renders text unless spoiler-safe mode is on and the unit isn't done yet; then offers a reveal button. */
export function SpoilerText({ unitKey, children, className }: { unitKey: string; children: React.ReactNode; className?: string }) {
  const { spoilerSafe, watched } = useApp();
  const [revealed, setRevealed] = useState(false);
  if (!spoilerSafe || revealed || watched.set.has(unitKey)) return <span className={className}>{children}</span>;
  return (
    <button type="button" onClick={() => setRevealed(true)} className="inline-flex items-center gap-1 text-xs text-muted-foreground underline decoration-dotted">
      <EyeOff className="size-3" aria-hidden /> Hidden (spoiler-safe mode). Reveal
    </button>
  );
}
