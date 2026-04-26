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
        <rect x="3" y="3" width="18" height="18" rx="3" />

        <rect
          x="11.1"
          y="5.2"
          width="2"
          height="4.8"
          rx="0.9"
          fill="#fff"
          stroke="none"
          className="animate-scroll-wheel"
        />
      </svg>
    );
  }
);

MouseScroll.displayName = 'MouseScroll';

export default MouseScroll as LucideIcon;
