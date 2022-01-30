// Striped down and converted to TS version of https://github.com/marcrobledo/RomPatcher.js/

import { getMarcFileFromSource, MarcFile } from "./MarcFile";

export function applyPatch(p,r,validateChecksums?): MarcFile{
	if(p && r){
		var patchedRom = p.apply(r, validateChecksums);
		patchedRom.fileName=r.fileName.replace(/\.([^\.]*?)$/, ' (patched).$1');
		patchedRom.fileType=r.fileType;
		return patchedRom

	}
}