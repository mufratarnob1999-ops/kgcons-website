/**
 * The Kishoreganj mark — a turbine and gear motif redrawn as clean vector
 * geometry, so it stays sharp at any size instead of the fine printed
 * detail of the original artwork blurring out at header height.
 *
 * Built from three elements, each simplified until it survives shrinking:
 * a five-blade turbine pinwheel, a ring of eight gear teeth, and the
 * inlet horn from the original mark. The centre hub is the one accent
 * touch — consistent with the token rule that the accent colour appears
 * sparingly, as occasional small markers.
 */

const BLADE_ANGLES = [0, 72, 144, 216, 288];
const TOOTH_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      {/* Gear ring */}
      <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="1.6" />
      {TOOTH_ANGLES.map((angle) => (
        <rect
          key={angle}
          x="22"
          y="4.5"
          width="4"
          height="3.5"
          rx="0.6"
          fill="currentColor"
          transform={`rotate(${angle} 24 24)`}
        />
      ))}

      {/* Turbine blades */}
      {BLADE_ANGLES.map((angle) => (
        <path
          key={angle}
          d="M24 24 C20.2 22 18.4 16.3 22 10.5 C25.2 15 25.3 20 24 24 Z"
          fill="currentColor"
          transform={`rotate(${angle} 24 24)`}
        />
      ))}

      {/* Inlet horn */}
      <line
        x1="37.9"
        y1="16"
        x2="43.3"
        y2="12.7"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />

      {/* Hub — the one accent touch */}
      <circle cx="24" cy="24" r="2.6" className="fill-accent" />
    </svg>
  );
}
