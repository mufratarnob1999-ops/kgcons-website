import { ImageResponse } from "next/og";

/*
  iOS home-screen icon — enough room at 180px for the full LogoMark detail
  (gear teeth and inlet horn included). iOS applies its own corner mask,
  so this stays a plain square.
*/

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const BLADE_ANGLES = [0, 72, 144, 216, 288];
const TOOTH_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

export default function AppleIcon() {
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
        <svg width="140" height="140" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="16" stroke="#f5f3ee" strokeWidth="1.6" />
          {TOOTH_ANGLES.map((angle) => (
            <rect
              key={angle}
              x="22"
              y="4.5"
              width="4"
              height="3.5"
              rx="0.6"
              fill="#f5f3ee"
              transform={`rotate(${angle} 24 24)`}
            />
          ))}
          {BLADE_ANGLES.map((angle) => (
            <path
              key={angle}
              d="M24 24 C20.2 22 18.4 16.3 22 10.5 C25.2 15 25.3 20 24 24 Z"
              fill="#f5f3ee"
              transform={`rotate(${angle} 24 24)`}
            />
          ))}
          <line
            x1="37.9"
            y1="16"
            x2="43.3"
            y2="12.7"
            stroke="#f5f3ee"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="24" cy="24" r="2.6" fill="#c7ff3d" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
