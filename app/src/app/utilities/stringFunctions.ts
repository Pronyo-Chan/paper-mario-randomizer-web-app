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
    "Allor": "All or",
    "B L U": "BLU",
    "P N K": "PNK",
    "G R N": "GRN",
    "R E D": "RED",
    "P- ": "P-",
    "D- ": "D-",
    "( ": "(",
    "N W": "NW",
    "N E": "NE",
    "S W": "SW",
    "S E": "SE",
    "Bros": "Bros.",
    "Non Progression": "Non-Progression Item",
    "Consumable": "Random Consumable",
}

export function escapeRegexChars(val: string): string {
    return val.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&')
}

const verboseStrings: Map<string, string> = new Map<string, string>();

const possessiveRegex = /\b(Merluvlee|Kolorado|Bowser|Petunia|Merlow|Troopa|Rosie|Mario|Peach|Tubba|Rowf|King|Lily|Boo|Guy|Bow)s\b/g;
const stringReplaceRegEx = new RegExp(Object.keys(verboseStringReplacements).map(escapeRegexChars).join('|'), 'g');

export function pascalToVerboseString(text: string): string {
    if (!text) {
        return null;
    }
    if (!verboseStrings.has(text)) {
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
        }).trimStart().replace(possessiveRegex, "$1's");

        verboseStrings.set(text, cleanText);
    }

    return verboseStrings.get(text);
}
