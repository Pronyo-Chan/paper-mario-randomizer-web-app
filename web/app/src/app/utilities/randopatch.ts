import { MarcFile } from "./MarcFile";

const RANDO_PATCH_ACTION_SEEK=0;
const RANDO_PATCH_ACTION_WRITE=1;
const RANDO_PATCH_FINAL_SEEK=2;

export class RandoPatch {
	public file: MarcFile;

    public apply(romFile: MarcFile, validate){    
    
        var tempFile= Object.create(romFile) as MarcFile //deep copy original file
        var finalSeekHit = false;

        //Patch structure: 1byte indicates read or write, then 4bytes data. Repeat
        while(this.file.offset < this.file.fileSize){
            if(finalSeekHit) {
                var data = this.file.readU32();
                tempFile.writeU32(data);
            } else {
                var operationType=this.file.readU8();
                if(operationType == RANDO_PATCH_ACTION_SEEK) 
                {
                    var address = this.file.readU32();
                    tempFile.seek(address)              
                    
                } else if (operationType == RANDO_PATCH_ACTION_WRITE) 
                {
                    var data = this.file.readU32();
                    tempFile.writeU32(data);                 
                }else if (operationType == RANDO_PATCH_FINAL_SEEK) 
                {
                    var address = this.file.readU32();
                    tempFile.seek(address)
                    finalSeekHit = true;                    
                }
            }
            
        }   
        return tempFile
    }
}

export function parseRandoPatchFile(file: MarcFile){
    
    file.littleEndian=false;
    var patch = new RandoPatch();
    patch.file = file;
    return patch;
}
