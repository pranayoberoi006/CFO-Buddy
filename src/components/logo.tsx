import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <path
          d="M6 25V17"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 25V14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18 25V20"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24.5 13.75C26.1569 13.75 27.5 12.4069 27.5 10.75C27.5 9.09315 26.1569 7.75 24.5 7.75C22.8431 7.75 21.5 9.09315 21.5 10.75C21.5 11.085 21.5492 11.4087 21.6408 11.7113L21.5 11.75L18.5 14.75L16.25 12.5"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className={cn('text-xl font-bold', className)}>
        CFO Buddy
      </span>
    </div>
  );
}
