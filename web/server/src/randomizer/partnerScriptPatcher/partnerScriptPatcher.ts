import { Paths } from '../../enums/paths';
import fs from 'fs-extra';
import { RandomizedPartner } from '../../entities/randomizedPartner';
import { Partner } from '../../enums/partner';

enum PartnerFunctionEnd {
    GOOMBARIO = '00000001 )',
    KOOPER = '00000002 )',
    BOMBETTE = '00000003 )',
    PARAKARRY = '00000004 )',
    BOW = '00000009 )',
    WATT = '00000006 )',
    SUSHIE = '00000007 )',
    LAKILESTER = '00000008 )'
}

export class PartnerScriptPatcher {

    private readonly PATCH_FILE_EXTENSION = '.mpat';

    private readonly partnerFunctionStarts: {[partnerName: string]: string} = {
        'Goombario': '$Function_80241E90 ( 00000002',
        'Kooper': '$Function_80240000 ( 00000006',
        'Bombette': '$Function_80240AF0 ( 00000001',
        'Parakarry': '$Function_80241030 ( 00000004',
        'Bow': '$Function_80240000 ( 00000000',
        'Watt': '$Function_80240000 ( 00000001',
        'Sushie': '$Function_80240610 ( 00000000',
        'Lakilester': '$Function_80240040 ( 00000000'
    };

    private readonly partnerFunctionEnds: {[partnerName: string]: string} = {
        'Goombario': '00000001 )',
        'Kooper': '00000002 )',
        'Bombette': '00000003 )',
        'Parakarry': '00000004 )',
        'Bow': '00000009 )',
        'Watt': '00000006 )',
        'Sushie': '00000007 )',
        'Lakilester': '00000008 )'
    };


    private static instance: PartnerScriptPatcher;
    private constructor() {}

    public patchPartnersInScripts(randomizedPartners: RandomizedPartner[]) {
        for (var randomPartner of randomizedPartners) {
            var fileNameToEdit = randomPartner.locationName + this.PATCH_FILE_EXTENSION
            var data = fs.readFileSync(Paths.MAP_PATCHES_PATH + fileNameToEdit, 'utf8');
            var result = data.replace(
                this.getScriptLineToFind(randomPartner.originalName),
                this.getScriptLineReplacement(randomPartner.originalName, randomPartner.newPartnerName)
            );
            
            fs.writeFileSync(Paths.MAP_PATCHES_PATH + fileNameToEdit, result, 'utf8');
        }
    }

    private getScriptLineToFind(originalPartner: Partner): string {
        return this.partnerFunctionStarts[originalPartner] + ' ' + this.partnerFunctionEnds[originalPartner];
    }

    private getScriptLineReplacement(originalPartner: Partner, newPartner: Partner): string {
        return this.partnerFunctionStarts[originalPartner] + ' ' + this.partnerFunctionEnds[newPartner];
    }



    static getInstance(): PartnerScriptPatcher {
        if (!PartnerScriptPatcher.instance) {
            PartnerScriptPatcher.instance = new PartnerScriptPatcher();
        }
        
        return PartnerScriptPatcher.instance;
    }
}