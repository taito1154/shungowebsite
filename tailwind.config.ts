import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "ipad-pro": { raw: "(width: 1024px) and (height: 1366px)" },
        iphoneSE: { raw: "(width: 375px) and (height: 667px)" },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        rampart: ['"Rampart One"', "cursive"],
        type: ['"Type writer"', "cursive"],
      },
    },
  },
  plugins: [],
} satisfies Config;
