/** Elaichi (cardamom) logo for header - green pod with stem */
export function ElaichiLogo({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      aria-hidden
    >
      <ellipse cx="20" cy="22" rx="12" ry="14" fill="currentColor" opacity="0.9" />
      <ellipse cx="20" cy="20" rx="8" ry="10" fill="currentColor" />
      <path
        d="M20 6v6M20 34v4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
