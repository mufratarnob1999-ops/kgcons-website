import { ImageResponse } from "next/og";

/*
  Browser-tab favicon. Simplified from LogoMark.tsx — the gear teeth and
  inlet horn are fine enough that they'd blur out at 16-32px, so this
  keeps only the ring, the turbine blades and the accent hub.
*/

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

const BLADE_ANGLES = [0, 72, 144, 216, 288];

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0a0a",
        }}
      >
        <svg width="27" height="27" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="16" stroke="#f5f3ee" strokeWidth="2.4" />
          {BLADE_ANGLES.map((angle) => (
            <path
              key={angle}
              d="M24 24 C20.2 22 18.4 16.3 22 10.5 C25.2 15 25.3 20 24 24 Z"
              fill="#f5f3ee"
              transform={`rotate(${angle} 24 24)`}
            />
          ))}
          <circle cx="24" cy="24" r="3.2" fill="#c7ff3d" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
