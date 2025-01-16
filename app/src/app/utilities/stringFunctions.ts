import { Constants } from "./constants";

const verboseStringReplacements = {
    "H P": "HP",
    "B P": "BP",
    "F P": "FP",
    "S P": "SP",
    "X P": "XP",
    "F X": "FX",
    "P O W": "POW",
    "O H K O": "One Hit KO",
    "N P C": "NPC",
    "T R A P": "TRAP",
    'D Down': "D-Down",
    "D Up": "D-Up",
    'P Down': "P-Down",
    "P Up": "P-Up",
    "Allor": "All or"
}

export function escapeRegexChars(val: string): string {
    return val.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&')
}

const stringReplaceRegEx = new RegExp(Object.keys(verboseStringReplacements).map(escapeRegexChars).join('|'), 'g');

export function pascalToVerboseString(text: string): string {
    if (!text) {
        return null;
    }

    if (text.includes("Letter") && text.length == 8) {
        return Constants.VERBOSE_LETTER_NAMES[text];
    }

    if (text.includes("MagicalSeed")) {
        return text.replace(/([A-Z0-9])/g, " $1");
    }

    var cleanText = text.replace(/([A-Z])/g, " $1");
    cleanText = cleanText.charAt(0).toUpperCase() + cleanText.slice(1);
    cleanText = cleanText.replace(stringReplaceRegEx, function (matched) {
        return verboseStringReplacements[matched];
    }).trimStart()

    return cleanText;
}
