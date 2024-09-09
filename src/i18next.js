import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import ptBrTranslations from "./lib/locales/pt-br.json";

void i18next.use(initReactI18next).init({
  lng: "pt",
  resources: {
    pt: {
      ...ptBrTranslations,
    },
  },
});

export default i18next;
