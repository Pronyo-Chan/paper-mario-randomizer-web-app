import { Constants } from "./constants";

export function pascalToVerboseString(text: string): string {
    if(!text){
        return null;
    }

    if(text.includes("Letter") && text.length == 8) {
        return Constants.VERBOSE_LETTER_NAMES[text];
    }

    if(text.includes("Seed") && text.length == 12) {
        return text.replace(/([A-Z0-9])/g, " $1");
    }

    var cleanText = text.replace(/([A-Z])/g, " $1");
    cleanText = cleanText.charAt(0).toUpperCase() + cleanText.slice(1); 
    cleanText = cleanText.replace("H P", "HP")
        .replace("B P", "BP")
        .replace("F P", "FP")
        .replace("S P", "SP")
        .replace("X P", "XP")
        .replace("F X", "FX")
        .replace("P O W", "POW")
        .replace("O H K O", "One Hit KO")
        .replace("N P C", "NPC")
        .replace("T R A P", "TRAP")
        .trimLeft()

    return cleanText;
}