/* Rom Patcher JS v20210920 - Marc Robledo 2016-2021 - http://www.marcrobledo.com/license */

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


/* custom patcher */
function isCustomPatcherEnabled(){
	return typeof CUSTOM_PATCHER!=='undefined' && typeof CUSTOM_PATCHER==='object' && CUSTOM_PATCHER.length
}
function parseCustomPatch(customPatch){
	patchFile=customPatch.fetchedFile;
	patchFile.seek(0);
	_readPatchFile();

	if(typeof patch.validateSource === 'undefined'){
		if(typeof customPatch.crc==='number'){
			patch.validateSource=function(romFile,headerSize){
				return customPatch.crc===crc32(romFile, headerSize)
			}
		}else if(typeof customPatch.crc==='object'){
			patch.validateSource=function(romFile,headerSize){
				for(var i=0; i<customPatch.crc.length; i++)
					if(customPatch.crc[i]===crc32(romFile, headerSize))
						return true;
				return false;
			}
		}
		validateSource();
	}
}	
function fetchPatch(customPatchIndex, compressedFileIndex){
	var customPatch=CUSTOM_PATCHER[customPatchIndex];

	setTabApplyEnabled(false);
	setMessage('apply', 'downloading', 'loading');

	var uri=decodeURI(customPatch.file.trim());

	//console.log(patchURI);

	if(typeof window.fetch==='function'){
		fetch(uri)
			.then(result => result.arrayBuffer()) // Gets the response and returns it as a blob
			.then(arrayBuffer => {
				patchFile=CUSTOM_PATCHER[customPatchIndex].fetchedFile=new MarcFile(arrayBuffer);
				patchFile.fileName=customPatch.file.replace(/^.*[\/\\]/g,'');

				if(patchFile.readString(4).startsWith(ZIP_MAGIC))
					ZIPManager.parseFile(CUSTOM_PATCHER[customPatchIndex].fetchedFile, compressedFileIndex);
				else
					parseCustomPatch(CUSTOM_PATCHER[customPatchIndex]);

				setMessage('apply');
			})
			.catch(function(evt){
				setMessage('apply', (_('error_downloading')/* + evt.message */).replace('%s', CUSTOM_PATCHER[customPatchIndex].file.replace(/^.*[\/\\]/g,'')), 'error');
			});
	}else{
		var xhr=new XMLHttpRequest();
		xhr.open('GET', uri, true);
		xhr.responseType='arraybuffer';

		xhr.onload=function(evt){
			if(this.status===200){
				patchFile=CUSTOM_PATCHER[customPatchIndex].fetchedFile=new MarcFile(xhr.response);
				patchFile.fileName=customPatch.file.replace(/^.*[\/\\]/g,'');

				if(patchFile.readString(4).startsWith(ZIP_MAGIC))
					ZIPManager.parseFile(CUSTOM_PATCHER[customPatchIndex].fetchedFile, compressedFileIndex);
				else
					parseCustomPatch(CUSTOM_PATCHER[customPatchIndex]);

				setMessage('apply');
			}else{
				setMessage('apply', _('error_downloading').replace('%s', CUSTOM_PATCHER[customPatchIndex].file.replace(/^.*[\/\\]/g,''))+' ('+this.status+')', 'error');
			}
		};

		xhr.onerror=function(evt){
			setMessage('apply', 'error_downloading', 'error');
		};

		xhr.send(null);
	}
}

function _parseROM(){
	el('checkbox-addheader').checked=false;
	el('checkbox-removeheader').checked=false;

	if(romFile.readString(4).startsWith(ZIP_MAGIC)){
		ZIPManager.parseFile(romFile);
		setTabApplyEnabled(false);
	}else{
		if(headerSize=canHaveFakeHeader(romFile)){
			el('row-addheader').className='row';
			if(headerSize<1024){
				el('headersize').innerHTML=headerSize+'b';
			}else{
				el('headersize').innerHTML=parseInt(headerSize/1024)+'kb';
			}
			el('row-removeheader').className='row hide';
		}else if(headerSize=hasHeader(romFile)){
			el('row-addheader').className='row hide';
			el('row-removeheader').className='row';
		}else{
			el('row-addheader').className='row hide';
			el('row-removeheader').className='row hide';
		}

		updateChecksums(romFile, 0);
	}
}


function canHaveFakeHeader(romFile){
	if(romFile.fileSize<=0x600000){
		for(var i=0; i<HEADERS_INFO.length; i++){
			if(HEADERS_INFO[i][0].test(romFile.fileName) && (romFile.fileSize%HEADERS_INFO[i][2]===0)){
				return HEADERS_INFO[i][1];
			}
		}
	}
	return 0;
}

function hasHeader(romFile){
	if(romFile.fileSize<=0x600200){
		if(romFile.fileSize%1024===0)
			return 0;

		for(var i=0; i<HEADERS_INFO.length; i++){
			if(HEADERS_INFO[i][0].test(romFile.fileName) && (romFile.fileSize-HEADERS_INFO[i][1])%HEADERS_INFO[i][1]===0){
				return HEADERS_INFO[i][1];
			}
		}
	} 
	return 0;
}

function updateChecksums(file, startOffset, force){
	if(file===romFile && file.fileSize>33554432 && !force){
		el('crc32').innerHTML='File is too big. <span onclick=\"updateChecksums(romFile,'+startOffset+',true)\">Force calculate checksum</span>';
		el('md5').innerHTML='';
		el('sha1').innerHTML='';
		setTabApplyEnabled(true);
		return false;
	}
	el('crc32').innerHTML='Calculating...';
	el('md5').innerHTML='Calculating...';

	if(CAN_USE_WEB_WORKERS){
		setTabApplyEnabled(false);
		webWorkerCrc.postMessage({u8array:file._u8array, startOffset:startOffset}, [file._u8array.buffer]);

		if(window.crypto&&window.crypto.subtle&&window.crypto.subtle.digest){
			el('sha1').innerHTML='Calculating...';
		}
	}else{
		window.setTimeout(function(){
			el('crc32').innerHTML=padZeroes(crc32(file, startOffset), 4);
			el('md5').innerHTML=padZeroes(md5(file, startOffset), 16);

			validateSource();
			setTabApplyEnabled(true);
		}, 30);

		if(window.crypto&&window.crypto.subtle&&window.crypto.subtle.digest){
			el('sha1').innerHTML='Calculating...';
			sha1(file);
		}
	}
}

function validateSource(){
	if(patch && romFile && typeof patch.validateSource !== 'undefined'){
		if(patch.validateSource(romFile, el('checkbox-removeheader').checked && hasHeader(romFile))){
			el('crc32').className='valid';
			setMessage('apply');
		}else{
			el('crc32').className='invalid';
			setMessage('apply', 'error_crc_input', 'warning');
		}
	}else{
		el('crc32').className='';
		setMessage('apply');
	}
}



function _readPatchFile(){
	setTabApplyEnabled(false);
	patchFile.littleEndian=false;

	var header=patchFile.readString(6);
	if(header.startsWith(ZIP_MAGIC)){
		patch=false;
		validateSource();
		setTabApplyEnabled(false);
		ZIPManager.parseFile(patchFile);
	}else{
		if(header.startsWith(IPS_MAGIC)){
			patch=parseIPSFile(patchFile);
		}else if(header.startsWith(UPS_MAGIC)){
			patch=parseUPSFile(patchFile);
		}else if(header.startsWith(APS_MAGIC)){
			patch=parseAPSFile(patchFile);
		}else if(header.startsWith(BPS_MAGIC)){
			patch=parseBPSFile(patchFile);
		}else if(header.startsWith(RUP_MAGIC)){
			patch=parseRUPFile(patchFile);
		}else if(header.startsWith(PPF_MAGIC)){
			patch=parsePPFFile(patchFile);
		}else if(header.startsWith(PMSR_MAGIC)){
			patch=parseMODFile(patchFile);
		}else if(header.startsWith(VCDIFF_MAGIC)){
			patch=parseVCDIFF(patchFile);
		}else{
			patch=null;
			setMessage('apply', 'error_invalid_patch', 'error');
		}

		validateSource();
		setTabApplyEnabled(true);
	}
}





function preparePatchedRom(originalRom, patchedRom, headerSize){
	patchedRom.fileName=originalRom.fileName.replace(/\.([^\.]*?)$/, ' (patched).$1');
	patchedRom.fileType=originalRom.fileType;
	if(headerSize){
		if(el('checkbox-removeheader').checked){
			var patchedRomWithOldHeader=new MarcFile(headerSize+patchedRom.fileSize);
			oldHeader.copyToFile(patchedRomWithOldHeader, 0);
			patchedRom.copyToFile(patchedRomWithOldHeader, 0, patchedRom.fileSize, headerSize);
			patchedRomWithOldHeader.fileName=patchedRom.fileName;
			patchedRomWithOldHeader.fileType=patchedRom.fileType;
			patchedRom=patchedRomWithOldHeader;
		}else if(el('checkbox-addheader').checked){
			patchedRom=patchedRom.slice(headerSize);

		}
	}



	/* fix checksum if needed */
	//var fixedChecksum=fixConsoleChecksum(patchedRom);




	setMessage('apply');
	patchedRom.save();


	/*if(fixedChecksum){
		setMessage('apply','Checksum was fixed','warning');
	}*/
	
	//debug: create unheadered patch
	/*if(headerSize && el('checkbox-addheader').checked){
		createPatch(romFile, patchedRom);
	}*/
}


/*function removeHeader(romFile){
	//r._dataView=new DataView(r._dataView.buffer, headerSize);
	oldHeader=romFile.slice(0,headerSize);
	r=r.slice(headerSize);
}*/
function applyPatch(p,r,validateChecksums){
	if(p && r){
		if(headerSize){
			if(el('checkbox-removeheader').checked){
				//r._dataView=new DataView(r._dataView.buffer, headerSize);
				oldHeader=r.slice(0,headerSize);
				r=r.slice(headerSize);
			}else if(el('checkbox-addheader').checked){
				var romWithFakeHeader=new MarcFile(headerSize+r.fileSize);
				romWithFakeHeader.fileName=r.fileName;
				romWithFakeHeader.fileType=r.fileType;
				r.copyToFile(romWithFakeHeader, 0, r.fileSize, headerSize);

				//add FDS header
				if(/\.fds$/.test(r.FileName) && r.fileSize%65500===0){
					//romWithFakeHeader.seek(0);
					romWithFakeHeader.writeBytes([0x46, 0x44, 0x53, 0x1a, r.fileSize/65500]);
				}

				r=romWithFakeHeader;
			}
		}

		/*if(CAN_USE_WEB_WORKERS){
			setMessage('apply', 'applying_patch', 'loading');
			setTabApplyEnabled(false);

			webWorkerApply.postMessage(
				{
					romFileU8Array:r._u8array,
					patchFileU8Array:p._u8array,
					validateChecksums:validateChecksums
				},[
					r._u8array.buffer,
					patchFile._u8array.buffer
				]
			);

		}else{*/
			//setMessage('apply', 'applying_patch', 'loading');

			try{
				p.apply(r, validateChecksums);
				preparePatchedRom(r, p.apply(r, validateChecksums), headerSize);

			}catch(e){
				//setMessage('apply', 'Error: '+_(e.message), 'error');
			}
		//}

	}else{
		setMessage('apply', 'No ROM/patch selected', 'error');
	}
}




/* GUI functions */
function setMessage(tab, key, className){
	/*
	var messageBox=el('message-'+tab);
	if(key){
        messageBox.setAttribute('data-localize',key);
		if(className==='loading'){
			messageBox.className='message';
			messageBox.innerHTML='<span class="loading"></span> '+_(key);
		}else{
			messageBox.className='message '+className;
			if(className==='warning')
				messageBox.innerHTML='&#9888; '+_(key);
			else if(className==='error')
				messageBox.innerHTML='&#10007; '+_(key);
			else
				messageBox.innerHTML=_(key);
		}
		messageBox.style.display='inline';
	}else{
		messageBox.style.display='none';
	}*/
}

function setElementEnabled(element,status){
	/*if(status){
		el(element).className='enabled';
	}else{
		el(element).className='disabled';
	}
	el(element).disabled=!status;*/
}
function setTabCreateEnabled(status){
	/*
	if(
		(romFile1 && romFile1.fileSize>TOO_BIG_ROM_SIZE) ||
		(romFile2 && romFile2.fileSize>TOO_BIG_ROM_SIZE)
	){
		setMessage('create',_('warning_too_big'),'warning');
	}
	setElementEnabled('input-file-rom1', status);
	setElementEnabled('input-file-rom2', status);
	setElementEnabled('select-patch-type', status);
	if(romFile1 && romFile2 && status){
		setElementEnabled('button-create', status);
	}else{
		setElementEnabled('button-create', false);
	}*/
}
function setTabApplyEnabled(status){
	/*
	setElementEnabled('input-file-rom', status);
	setElementEnabled('input-file-patch', status);
	if(romFile && status && (patch || isCustomPatcherEnabled())){
		setElementEnabled('button-apply', status);
	}else{
		setElementEnabled('button-apply', false);
	}
	*/
}






/* FileSaver.js (source: http://purl.eligrey.com/github/FileSaver.js/blob/master/src/FileSaver.js)
 * A saveAs() FileSaver implementation.
 * 1.3.8
 * 2018-03-22 14:03:47
 *
 * By Eli Grey, https://eligrey.com
 * License: MIT
 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */
var saveAs=saveAs||function(c){"use strict";if(!(void 0===c||"undefined"!=typeof navigator&&/MSIE [1-9]\./.test(navigator.userAgent))){var t=c.document,f=function(){return c.URL||c.webkitURL||c},s=t.createElementNS("http://www.w3.org/1999/xhtml","a"),d="download"in s,u=/constructor/i.test(c.HTMLElement)||c.safari,l=/CriOS\/[\d]+/.test(navigator.userAgent),p=c.setImmediate||c.setTimeout,v=function(t){p(function(){throw t},0)},w=function(t){setTimeout(function(){"string"==typeof t?f().revokeObjectURL(t):t.remove()},4e4)},m=function(t){return/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(t.type)?new Blob([String.fromCharCode(65279),t],{type:t.type}):t},r=function(t,n,e){e||(t=m(t));var r,o=this,a="application/octet-stream"===t.type,i=function(){!function(t,e,n){for(var r=(e=[].concat(e)).length;r--;){var o=t["on"+e[r]];if("function"==typeof o)try{o.call(t,n||t)}catch(t){v(t)}}}(o,"writestart progress write writeend".split(" "))};if(o.readyState=o.INIT,d)return r=f().createObjectURL(t),void p(function(){var t,e;s.href=r,s.download=n,t=s,e=new MouseEvent("click"),t.dispatchEvent(e),i(),w(r),o.readyState=o.DONE},0);!function(){if((l||a&&u)&&c.FileReader){var e=new FileReader;return e.onloadend=function(){var t=l?e.result:e.result.replace(/^data:[^;]*;/,"data:attachment/file;");c.open(t,"_blank")||(c.location.href=t),t=void 0,o.readyState=o.DONE,i()},e.readAsDataURL(t),o.readyState=o.INIT}r||(r=f().createObjectURL(t)),a?c.location.href=r:c.open(r,"_blank")||(c.location.href=r);o.readyState=o.DONE,i(),w(r)}()},e=r.prototype;return"undefined"!=typeof navigator&&navigator.msSaveOrOpenBlob?function(t,e,n){return e=e||t.name||"download",n||(t=m(t)),navigator.msSaveOrOpenBlob(t,e)}:(e.abort=function(){},e.readyState=e.INIT=0,e.WRITING=1,e.DONE=2,e.error=e.onwritestart=e.onprogress=e.onwrite=e.onabort=e.onerror=e.onwriteend=null,function(t,e,n){return new r(t,e||t.name||"download",n)})}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this);