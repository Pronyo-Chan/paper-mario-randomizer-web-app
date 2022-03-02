export function pascalToVerboseString(text: string): string {
    if(!text){
        return null;
    }
    var cleanText = text.replace(/([A-Z0-9])/g, " $1");
    cleanText = cleanText.charAt(0).toUpperCase() + cleanText.slice(1); 
    cleanText = cleanText.replace("H P", "HP")
        .replace("B P", "BP")
        .replace("F P", "FP")
        .replace("S P", "SP")
        .replace("X P", "SP")
        .replace("F X", "FX")
        .replace("P O W", "POW")
        .replace("O H K O", "One Hit KO")
        .replace("N P C", "NPC")
        .trimLeft()

    return cleanText;
}