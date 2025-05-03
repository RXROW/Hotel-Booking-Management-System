import "react-i18next";
import enTranslation from "../locales/en/translation.json";

// Extend the i18next TypeScript definitions
declare module "react-i18next" {
  interface CustomTypeOptions {
    // Define your default resource schema based on English translations
    resources: {
      translation: typeof enTranslation;
    };
  }
}
