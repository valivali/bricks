import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import { translations as heTranslations } from "./translations/he"

i18n.use(initReactI18next).init({
  lng: "he",
  fallbackLng: "he",
  interpolation: {
    escapeValue: false
  },
  resources: {
    he: {
      translation: heTranslations
    }
  }
})

export default i18n
