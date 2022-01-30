// Striped down and converted to TS version of https://github.com/marcrobledo/RomPatcher.js/

import { crc32 } from "./crc32";
import { getMarcFileFromLength } from "./MarcFile";

/* File format specification: https://www.romhacking.net/documents/746/ */
const BPS_MAGIC='BPS1';
const BPS_ACTION_SOURCE_READ=0;
const BPS_ACTION_TARGET_READ=1;
const BPS_ACTION_SOURCE_COPY=2;
const BPS_ACTION_TARGET_COPY=3;

export class BPS {
    sourceSize:number;
	targetSize:number;
	metaData:string;
	actions: any[] = [];
	sourceChecksum:number;
	targetChecksum:number;
	patchChecksum:number;

    toString() 
    {
        var s='Source size: '+this.sourceSize;
        s+='\nTarget size: '+this.targetSize;
        s+='\nMetadata: '+this.metaData;
        s+='\n#Actions: '+this.actions.length;
        return s
    }

    validateSource(romFile,headerSize?)
    {
        return this.sourceChecksum===crc32(romFile, headerSize)
    }

    apply(romFile, validate){
        if(validate && !this.validateSource(romFile)){
            throw new Error('error_crc_input');
        }        
    
        var tempFile=getMarcFileFromLength(this.targetSize);    
    
        //patch
        var sourceRelativeOffset=0;
        var targetRelativeOffset=0;
        for(var i=0; i<this.actions.length; i++){
            var action=this.actions[i];
    
            if(action.type===BPS_ACTION_SOURCE_READ){
                romFile.copyToFile(tempFile, tempFile.offset, action.length);
                tempFile.skip(action.length);
    
            }else if(action.type===BPS_ACTION_TARGET_READ){
                tempFile.writeBytes(action.bytes);
    
            }else if(action.type===BPS_ACTION_SOURCE_COPY){
                sourceRelativeOffset+=action.relativeOffset;
                var actionLength=action.length;
                while(actionLength--){
                    tempFile.writeU8(romFile.u8Array[sourceRelativeOffset]);
                    sourceRelativeOffset++;
                }
            }else if(action.type===BPS_ACTION_TARGET_COPY){
                targetRelativeOffset+=action.relativeOffset;
                var actionLength=action.length;
                while(actionLength--) {
                    tempFile.writeU8(tempFile.u8Array[targetRelativeOffset]);
                    targetRelativeOffset++;
                }
            }
        }
    
        if(validate && this.targetChecksum!==crc32(tempFile)){
            throw new Error('error_crc_output');
        }
    
        return tempFile
    }   
    
    
    BPS_readVLV(file){
        var data=0, shift=1;
        while(true){
            var x = file.readU8();
            data += (x & 0x7f) * shift;
            if(x & 0x80)
                break;
            shift <<= 7;
            data += shift;
        }
    
        file.lastRead=data;
        return data;
    }
    BPS_writeVLV(data){
        while(true){
            var x = data & 0x7f;
            data >>= 7;
            if(data === 0){
                data.writeU8(0x80 | x);
                break;
            }
            data.writeU8(x);
            data--;
        }
    }
    BPS_getVLVLen(data){
        var len=0;
        while(true){
            var x = data & 0x7f;
            data >>= 7;
            if(data === 0){
                len++;
                break;
            }
            len++;
            data--;
        }
        return len;
    }    
}

export function parseBPSFile(file){
    
    file.littleEndian=true;
    var patch=new BPS();

    
    file.seek(4); //skip BPS1
    
    patch.sourceSize= patch.BPS_readVLV(file);
    patch.targetSize= patch.BPS_readVLV(file);

    var metaDataLength=patch.BPS_readVLV(file);
    if(metaDataLength){
        patch.metaData=file.readString(metaDataLength);
    }


    var endActionsOffset=file.fileSize-12;
    while(file.offset<endActionsOffset){
        var data=patch.BPS_readVLV(file);
        var action={type: data & 3, length: (data >> 2)+1, bytes: [], relativeOffset: 0};

        if(action.type===BPS_ACTION_TARGET_READ){
            action.bytes=file.readBytes(action.length);

        }else if(action.type===BPS_ACTION_SOURCE_COPY || action.type===BPS_ACTION_TARGET_COPY){
            var relativeOffset=patch.BPS_readVLV(file);
            action.relativeOffset=(relativeOffset & 1? -1 : +1) * (relativeOffset >> 1)
        }

        patch.actions.push(action);
    }

    //file.seek(endActionsOffset);
    patch.sourceChecksum=file.readU32();
    patch.targetChecksum=file.readU32();
    patch.patchChecksum=file.readU32();

    if(patch.patchChecksum!==crc32(file, 0, true)){
        throw new Error('error_crc_patch');
    }


    return patch;
}
