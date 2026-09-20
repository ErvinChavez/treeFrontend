export function TreeRemovalIcon({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 3 6 11h3l-4 6h5v4" />
      <path d="M12 3l6 8h-3l4 6h-5" />
      <line x1="17" y1="4" x2="21" y2="8" />
      <line x1="21" y1="4" x2="17" y2="8" />
    </svg>
  );
}

export function TreeTrimmingIcon({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 21V11" />
      <path d="M12 11c-3 0-5-2-5-5 1 0 3 1 4 2" />
      <path d="M12 11c3 0 5-2 5-5-1 0-3 1-4 2" />
      <circle cx="12" cy="4" r="2" />
      <path d="M5 5l3 3M8 5l-3 3" transform="translate(0 8)" />
    </svg>
  );
}

export function StumpGrindingIcon({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <ellipse cx="12" cy="16" rx="7" ry="3" />
      <path d="M6 16c0-4 2-6 2-9M18 16c0-4-2-6-2-9" />
      <path d="M9 7c1-2 5-2 6 0" />
      <circle cx="12" cy="16" r="2.5" />
    </svg>
  );
}

export function LandClearingIcon({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M3 19h18" />
      <path d="M5 19l4-11 4 11" />
      <path d="M13 19l3-7 3 7" />
      <line x1="19" y1="5" x2="22" y2="8" />
      <line x1="22" y1="5" x2="19" y2="8" />
    </svg>
  );
}

export function EmergencyIcon({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 2 3 7v6c0 5 4 8 9 9 5-1 9-4 9-9V7l-9-5z" />
      <line x1="12" y1="8" x2="12" y2="13" />
      <line x1="12" y1="16" x2="12" y2="16.01" />
    </svg>
  );
}

export function FirewoodIcon({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <ellipse cx="7" cy="9" rx="4" ry="2.4" transform="rotate(-15 7 9)" />
      <ellipse cx="17" cy="9" rx="4" ry="2.4" transform="rotate(15 17 9)" />
      <ellipse cx="7" cy="16" rx="4" ry="2.4" transform="rotate(-15 7 16)" />
      <ellipse cx="17" cy="16" rx="4" ry="2.4" transform="rotate(15 17 16)" />
    </svg>
  );
}

// Generic fallback for any service name that doesn't match a keyword below.
export function DefaultTreeIcon({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 3 5 13h4l-3 5h12l-3-5h4L12 3z" />
      <line x1="12" y1="18" x2="12" y2="21" />
    </svg>
  );
}