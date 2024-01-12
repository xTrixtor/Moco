import type { Config } from 'tailwindcss'

export default<Partial<Config>> {
  content: [],
  theme: {
    extend: {
      colors: {
          primary: "var(--primary-color)",
          "primary-text" : "var(--primary-color-text)",
        "primary-content": "var(--primary-900)",
        "primary-dark": "var(--primary-500)",
        "primary-light": "var(--primary-300)",

        secondary: "var(--bluegray-500)",
        "secondary-content": "var(--bluegray-900)",
        "secondary-dark": "var(--bluegray-700)",
        "secondary-light": "var(--bluegray-200)",

        background: "var(--surface-ground)",
        foreground: "var(--surface-overlay)",
        border: "var(--surface-border)",
        card: "var(--surface-card)",

        "highlight-text": "var(--highlight-text-color)",
        "hightlight-bg": "var(--highlight-bg)",

        copy: "#fbfbfc",
        "copy-light": "#d2dbdf",
        "copy-lighter": "#96acb5",

        success: "#70e770",
        warning: "#e7e770",
        error: "#e77070",

        "success-content": "#0d4b0d",
        "warning-content": "#4b4b0d",
        "error-content": "#4b0d0d",
      },
    },
  },
  plugins: [],
};
