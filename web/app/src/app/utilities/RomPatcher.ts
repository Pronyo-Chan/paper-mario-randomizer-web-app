/* Rom Patcher JS v20210920 - Marc Robledo 2016-2021 - http://www.marcrobledo.com/license */

import { getMarcFileFromSource, MarcFile } from "./MarcFile";

const TOO_BIG_ROM_SIZE=67108863;
const HEADERS_INFO=[
	[/\.nes$/, 16, 1024], //interNES
	[/\.fds$/, 16, 65500], //fwNES
	[/\.lnx$/, 64, 1024],
	//[/\.rom$/, 8192, 1024], //jaguar
	[/\.(pce|nes|gbc?|smc|sfc|fig|swc)$/, 512, 1024]
];



var romFile, patchFile, patch, romFile1, romFile2, tempFile, headerSize, oldHeader;
var userLanguage;

var CAN_USE_WEB_WORKERS=false;


/* Shortcuts */
function addEvent(e,ev,f){e.addEventListener(ev,f,false)}
function el(e){return document.getElementById(e)}
function _(str){return userLanguage[str] || str}


export function applyPatch(p,r,validateChecksums?): MarcFile{
	if(p && r){

			try{
				var patchedRom = p.apply(r, validateChecksums);
				patchedRom.fileName=r.fileName.replace(/\.([^\.]*?)$/, ' (patched).$1');
				patchedRom.fileType=r.fileType;
                return patchedRom

			}catch(e){
				//setMessage('apply', 'Error: '+_(e.message), 'error');
			}
		//}

	}
}