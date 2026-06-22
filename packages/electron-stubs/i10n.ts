export const LOCALES: Record<string, string> = {
    en: "English",
    "en-US": "English (US)",
};

export const getLocale = () => "en-US";
export const setLocale = (_value: string) => {};

export const DATE_FORMATS = [
    { format: "L", description: "Locale default" },
];

export const getDateFormat = () => "L";
export const setDateFormat = (_value: string) => {};

export const TIME_FORMATS = [
    { format: "LTS", description: "Locale default" },
];

export const getTimeFormat = () => "LTS";
export const setTimeFormat = (_value: string) => {};
