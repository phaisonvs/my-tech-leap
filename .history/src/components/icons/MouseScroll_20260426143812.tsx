import { forwardRef } from 'react';
import type { LucideIcon, LucideProps } from 'lucide-react';

const MouseScroll = forwardRef<SVGSVGElement, LucideProps>(
  ({ className, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        {...props}
      >
        {/* Mouse body - mais largo e arredondado */}
        <rect x="7" y="4" width="16" height="18" rx="5" />
        
        {/* Scroll wheel - animated dot */}
        <circle cx="12" cy="9" r="1.5" fill="currentColor" className="animate-scroll-wheel" />
      </svg>
    );
  }
);

MouseScroll.displayName = 'MouseScroll';

export default MouseScroll as LucideIcon;
