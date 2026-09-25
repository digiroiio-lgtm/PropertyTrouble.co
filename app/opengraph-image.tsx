import { ImageResponse } from "next/og";
import { siteName, tagline } from "@/lib/site";

export const alt = "What does your property need next?";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#f6f4ee",
          color: "#17211c",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 32, fontWeight: 800 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: "#17211c", display: "flex" }} />
          {siteName}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontSize: 88, fontWeight: 900, lineHeight: 0.95, letterSpacing: -4 }}>
            What does your property need next?
          </div>
          <div style={{ fontSize: 32, color: "#59645c" }}>{tagline}</div>
        </div>
        <div style={{ display: "flex", height: 14, width: 220, borderRadius: 7, background: "#d8ff63" }} />
      </div>
    ),
    size,
  );
}
