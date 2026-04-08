import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      colors: {
        purple: "#a855f7",
        teal: "#22d3ee",
        flame: "#f97316",
        bg: "#050505",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "var(--font-geist-sans)", "system-ui"],
      },
      boxShadow: {
        glowPurple: "0 0 60px -12px rgba(168, 85, 247, 0.45)",
        glowTeal: "0 0 50px -10px rgba(34, 211, 238, 0.4)",
        glowFlame: "0 0 40px -8px rgba(249, 115, 22, 0.35)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, transparent, rgb(5 5 5)), linear-gradient(rgb(5 5 5 / 0.85) 1px, transparent 1px), linear-gradient(90deg, rgb(5 5 5 / 0.85) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "100% 100%, 48px 48px, 48px 48px",
      },
    },
  },
} satisfies Config;
