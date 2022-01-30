import { Observable, Subscriber } from 'rxjs';
/* MODDED VERSION OF MarcFile.js v20181020 - Marc Robledo 2014-2018 - http://www.marcrobledo.com/license */

export class MarcFile {
    public littleEndian: boolean;
    public offset: number = 0;
    public lastRead: any;
    public fileName : string;
    public fileType : string;
    public fileSize : number;
    public fileReader: any;
    public u8Array: any;
    public dataView: any;

    IS_MACHINE_LITTLE_ENDIAN(){	/* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView#Endianness */
        var buffer=new ArrayBuffer(2);
        new DataView(buffer).setInt16(0, 256, true /* littleEndian */);
        // Int16Array uses the platform's endianness.
        return new Int16Array(buffer)[0] === 256;
    }  
    
    
    public seek(offset){
        this.offset=offset;
    }
    skip(nBytes){
        this.offset+=nBytes;
    }
    isEOF(){
        return !(this.offset<this.fileSize)
    }
    
    slice(offset, len){
        len=len || (this.fileSize-offset);
    
        var newFile;
    
        if(typeof this.u8Array.buffer.slice!=='undefined'){
            newFile=getMarcFileFromSource(0);
            newFile.fileSize=len;
            newFile.u8Array=new Uint8Array(this.u8Array.buffer.slice(offset, offset+len));
        }else{
            newFile=getMarcFileFromSource(len);
            this.copyToFile(newFile, offset, len, 0);
        }
        newFile.fileName=this.fileName;
        newFile.fileType=this.fileType;
        newFile.littleEndian=this.littleEndian;
        return newFile;
    }
    
    
    copyToFile(target, offsetSource, len, offsetTarget){
        if(typeof offsetTarget==='undefined')
            offsetTarget=offsetSource;
    
        len=len || (this.fileSize-offsetSource);
    
        for(var i=0; i<len; i++){
            target.u8Array[offsetTarget+i]=this.u8Array[offsetSource+i];
        }
    }

    public save(): Blob{
        var blob;
        try{
            blob=new Blob([this.u8Array],{type:this.fileType});
        }catch(e){

            throw new Error('Incompatible Browser');
            
        }
        return blob
    }
    
    readU8(){
        this.lastRead=this.u8Array[this.offset];
    
        this.offset++;
        return this.lastRead
    }
    readU16(){
        if(this.littleEndian)
            this.lastRead=this.u8Array[this.offset] + (this.u8Array[this.offset+1] << 8);
        else
            this.lastRead=(this.u8Array[this.offset] << 8) + this.u8Array[this.offset+1];
    
        this.offset+=2;
        return this.lastRead >>> 0
    }
    readU24(){
        if(this.littleEndian)
            this.lastRead=this.u8Array[this.offset] + (this.u8Array[this.offset+1] << 8) + (this.u8Array[this.offset+2] << 16);
        else
            this.lastRead=(this.u8Array[this.offset] << 16) + (this.u8Array[this.offset+1] << 8) + this.u8Array[this.offset+2];
    
        this.offset+=3;
        return this.lastRead >>> 0
    }
    readU32(){
        if(this.littleEndian)
            this.lastRead=this.u8Array[this.offset] + (this.u8Array[this.offset+1] << 8) + (this.u8Array[this.offset+2] << 16) + (this.u8Array[this.offset+3] << 24);
        else
            this.lastRead=(this.u8Array[this.offset] << 24) + (this.u8Array[this.offset+1] << 16) + (this.u8Array[this.offset+2] << 8) + this.u8Array[this.offset+3];
    
        this.offset+=4;
        return this.lastRead >>> 0
    }
    
    readBytes(len){
        this.lastRead=new Array(len);
        for(var i=0; i<len; i++){
            this.lastRead[i]=this.u8Array[this.offset+i];
        }
    
        this.offset+=len;
        return this.lastRead
    }
    
    readString(len){
        this.lastRead='';
        for(var i=0;i<len && (this.offset+i)<this.fileSize && this.u8Array[this.offset+i]>0;i++)
            this.lastRead=this.lastRead+String.fromCharCode(this.u8Array[this.offset+i]);
    
        this.offset+=len;
        return this.lastRead
    }
    
    writeU8(u8){
        this.u8Array[this.offset]=u8;
    
        this.offset++;
    }
    writeU16(u16){
        if(this.littleEndian){
            this.u8Array[this.offset]=u16 & 0xff;
            this.u8Array[this.offset+1]=u16 >> 8;
        }else{
            this.u8Array[this.offset]=u16 >> 8;
            this.u8Array[this.offset+1]=u16 & 0xff;
        }
    
        this.offset+=2;
    }
    writeU24(u24){
        if(this.littleEndian){
            this.u8Array[this.offset]=u24 & 0x0000ff;
            this.u8Array[this.offset+1]=(u24 & 0x00ff00) >> 8;
            this.u8Array[this.offset+2]=(u24 & 0xff0000) >> 16;
        }else{
            this.u8Array[this.offset]=(u24 & 0xff0000) >> 16;
            this.u8Array[this.offset+1]=(u24 & 0x00ff00) >> 8;
            this.u8Array[this.offset+2]=u24 & 0x0000ff;
        }
    
        this.offset+=3;
    }
    writeU32(u32){
        if(this.littleEndian){
            this.u8Array[this.offset]=u32 & 0x000000ff;
            this.u8Array[this.offset+1]=(u32 & 0x0000ff00) >> 8;
            this.u8Array[this.offset+2]=(u32 & 0x00ff0000) >> 16;
            this.u8Array[this.offset+3]=(u32 & 0xff000000) >> 24;
        }else{
            this.u8Array[this.offset]=(u32 & 0xff000000) >> 24;
            this.u8Array[this.offset+1]=(u32 & 0x00ff0000) >> 16;
            this.u8Array[this.offset+2]=(u32 & 0x0000ff00) >> 8;
            this.u8Array[this.offset+3]=u32 & 0x000000ff;
        }
    
        this.offset+=4;
    }
    
    
    writeBytes(a){
        for(var i=0;i<a.length;i++)
            this.u8Array[this.offset+i]=a[i]
    
        this.offset+=a.length;
    }
    
    writeString(str,len){
        len=len || str.length;
        for(var i=0;i<str.length && i<len;i++)
            this.u8Array[this.offset+i]=str.charCodeAt(i);
    
        for(;i<len;i++)
            this.u8Array[this.offset+i]=0x00;
    
        this.offset+=len;
    }
    

}

export function getMarcFileFromSource(source): Observable<MarcFile>{	
	
    var marcFile = new MarcFile();
	if(typeof source==='object' && source.files) /* get first file only if source is input with multiple files */
		source=source.files[0];

	marcFile.littleEndian=false;
	marcFile.offset=0;
	marcFile.lastRead=null;

	if(typeof source==='object' && source.name && source.size)
    {   /* source is file */
		if(typeof window.FileReader!=='function')
			throw new Error('Incompatible Browser');

        marcFile.fileName=source.name;
        marcFile.fileType=source.type;
        marcFile.fileSize=source.size;

        marcFile.fileReader=new FileReader();
        marcFile.fileReader.marcFile=this;
        marcFile.fileReader.readAsArrayBuffer(source);

        return Observable.create((observer: Subscriber<any>) => {
            // if success
            marcFile.fileReader.onload = ((ev: ProgressEvent): void => {
                marcFile.u8Array=new Uint8Array((ev.target as any).result);
                marcFile.dataView=new DataView((ev.target as any).result);

                observer.next(marcFile);
                observer.complete();
            });
            // if failed
            marcFile.fileReader.onerror = (error: any): void => {
                observer.error(error);
            }
        });



	} else if(typeof source==='object' && typeof source.fileName==='string' && typeof source.littleEndian==='boolean'){ /* source is MarcFile */
        throw new Error('not implemented');
		/* this.fileName=source.fileName;
		this.fileType=source.fileType;
		this.fileSize=source.fileSize;

		var ab=new ArrayBuffer(source);
		this.u8Array=new Uint8Array(this.fileType);
		this.dataView=new DataView(this.fileType);
		
		source.copyToFile(this, 0);
		if(onLoad)
			onLoad.call(); */



	}else if(typeof source==='object' && typeof source.byteLength==='number'){ /* source is ArrayBuffer or TypedArray */
        throw new Error('not implemented');
		/* this.fileName='file.bin';
		this.fileType='application/octet-stream';
		this.fileSize=source.byteLength;

		if(typeof source.buffer !== 'undefined')
			source=source.buffer;
		this.u8Array=new Uint8Array(source);
		this.dataView=new DataView(source);

		if(onLoad)
			onLoad.call(); */



	}else if(typeof source==='number'){ /* source is integer (new empty file) */	 
        throw new Error('Please use getMarcFileFromLength() instead');
	}else{
		throw new Error('Invalid source');
	}
}

export function getMarcFileFromLength(length: number): MarcFile {
    var marcFile = new MarcFile();
    marcFile.fileName='file.bin';
    marcFile.fileType='application/octet-stream';
    marcFile.fileSize=length;

    var ab=new ArrayBuffer(length);
    marcFile.u8Array=new Uint8Array(ab);
    marcFile.dataView=new DataView(ab);
    return marcFile;
}
