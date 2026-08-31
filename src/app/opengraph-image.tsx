import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BLADE_ANGLES = [0, 72, 144, 216, 288];
const TOOTH_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div style={{ width: "32px", height: "2px", background: "#c7ff3d" }} />
          <span
            style={{
              fontSize: "22px",
              letterSpacing: "3px",
              color: "#969696",
              textTransform: "uppercase",
            }}
          >
            Social Media Consultancy
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontWeight: 700,
            fontSize: "88px",
            lineHeight: 1.02,
            letterSpacing: "-3px",
            color: "#f5f3ee",
          }}
        >
          <span>Turn attention</span>
          <span>into growth.</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #1f1f1f",
            paddingTop: "36px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <svg width="34" height="34" viewBox="0 0 48 48" fill="none">
              <circle
                cx="24"
                cy="24"
                r="16"
                stroke="#f5f3ee"
                strokeWidth="1.6"
              />
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
            <span style={{ fontSize: "28px", fontWeight: 700, color: "#f5f3ee" }}>
              {site.shortName}
              <span style={{ fontWeight: 500, color: "#969696" }}>
                {" "}
                Consultancy
              </span>
            </span>
          </div>
          <span style={{ fontSize: "22px", color: "#969696" }}>
            {site.domain}
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
