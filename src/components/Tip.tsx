import type { ReactNode } from 'react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

/** Styled tooltip for any element. Use this instead of a native `title` attribute (which shows the browser's
 *  plain tooltip). The child must accept a ref and props (an element, or wrap it in a <span>). */
export function Tip({ content, children, side, className }: { content: ReactNode; children: ReactNode; side?: 'top' | 'bottom' | 'left' | 'right'; className?: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side={side} className={className ?? 'max-w-xs'}>{content}</TooltipContent>
    </Tooltip>
  );
}
