import { strings_en } from "../Values-en/Strings";
import { strings_hi } from "../Values-hi/Strings";
import { strings_tel } from "../Values-tel/Strings";

export const languages = {
    en: strings_en,
    hi: strings_hi,
    tel: strings_tel
}

export const presentLanguage = localStorage.getItem('currentLanguage') ? languages[localStorage.getItem('currentLanguage')] : languages.en;