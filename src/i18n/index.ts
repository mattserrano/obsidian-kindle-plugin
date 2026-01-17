import { getLanguage } from 'obsidian';

import { STRINGS_EN } from './locales/en';
import { STRINGS_ES } from './locales/es';

type TranslationStrings = typeof STRINGS_EN;

const LANGUAGE_MAP: Record<string, TranslationStrings> = {
  en: STRINGS_EN,
  es: STRINGS_ES,
};

function getObsidianLanguage(): string {
  const locale = getCurrentLanguage();

  // Check if the detected language is supported
  if (locale && locale in LANGUAGE_MAP) {
    return locale;
  }

  // Fallback to English
  return 'en';
}

export function getCurrentLanguage(): string {
  return getLanguage();
}

export const strings: TranslationStrings = LANGUAGE_MAP[getObsidianLanguage()];
