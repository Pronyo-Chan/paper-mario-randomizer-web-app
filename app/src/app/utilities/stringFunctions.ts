export function pascalToVerboseString(text: string): string {
    var cleanText = text.replace(/([A-Z0-9])/g, " $1");
    cleanText = cleanText.charAt(0).toUpperCase() + cleanText.slice(1); 
    cleanText = cleanText.replace("H P", "HP").replace("B P", "BP").replace("F P", "FP").replace("F X", "FX").replace("P O W", "POW").trimLeft()

    return cleanText;
}