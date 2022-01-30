/* Rom Patcher JS v20210920 - Marc Robledo 2016-2021 - http://www.marcrobledo.com/license */

import { getMarcFileFromSource } from "./MarcFile";

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


function preparePatchedRom(originalRom, patchedRom, headerSize){
	patchedRom.fileName=originalRom.fileName.replace(/\.([^\.]*?)$/, ' (patched).$1');
	patchedRom.fileType=originalRom.fileType;

	return patchedRom.save();
}

export function applyPatch(p,r,validateChecksums?){
	if(p && r){

			try{
				var tempFile = p.apply(r, validateChecksums);
                var patchedRom = preparePatchedRom(r, tempFile, headerSize);
                return patchedRom

			}catch(e){
				//setMessage('apply', 'Error: '+_(e.message), 'error');
			}
		//}

	}
}