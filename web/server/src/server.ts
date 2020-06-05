import { PartnerScriptPatcher } from './partnerScriptPatcher';
import { Player } from './entities/player/player';
import { PartnerRandomizer } from './partnerRandomizer';
import express from 'express';
const app = express();
import bodyParser from "body-parser";
const PORT = process.env.PORT || 3000;
import fs from 'fs-extra';
const exec = require('child_process').exec;

import multer from 'multer';
import { Paths } from './enums/paths';
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, '..\\..\\'),
  filename: (req, file, cb) => cb(null, 'PM64.z64')
})
const upload = multer({storage: storage})

var starRodJarPath = `${__dirname}\\..\\..\\..\\StarRod`; // For some reason only childProcess is picky and needs dirName

app.use(bodyParser.urlencoded({
  extended: false
}));

app.post('/api/patch', upload.single('inputRom', 1), (request: any, result) => {
  if(!isRomSizeValid(request.file)) {
    result.writeHead(400, "invalidRom");
    result.end('Invalid Rom');
    return;
  } 

  fs.copy(Paths.CLEAN_MOD_PATH, Paths.WORKING_MOD_PATH)
  .then(() => {
    var randomizer = new PartnerRandomizer();
    var player = new Player();
    var partnerScriptPatcher = PartnerScriptPatcher.getInstance();

    var randomizedPartners = randomizer.randomizePartners(player);
    partnerScriptPatcher.patchPartnersInScripts(randomizedPartners);

    const childProcess = exec(`java -jar ${starRodJarPath}\\StarRod.jar -CompileMod`, {cwd: starRodJarPath}, function(err, stdout, stderr) {
      console.log(stdout);
      if (err) {
        console.log(err)
      }
    })
    childProcess.on('exit', () => {
      fs.pathExists(Paths.PATCHED_ROM_PATH)
      .then((exists) => {
        if (exists) {     
          result.writeHead(200, {
            "Content-Type": "application/octet-stream",
            "Content-Disposition": "attachment; filename=Paper\Mario.z64" 
          });
          const outFile = fs.createReadStream(Paths.PATCHED_ROM_PATH);
          outFile.on('end', () => fs.remove(Paths.WORKING_MOD_PATH)
          .then(() => fs.remove(Paths.CLEAN_ROM_PATH))
          .then(() => console.log('deleted workingDir and rom')))
          outFile.pipe(result);
        } else {
          result.writeHead(400, {"Content-Type": "text/plain"});
          result.end("Failed to patch rom");
        }
      });
    })
  })
  .catch(err => {
    console.error(err)
  })
  
});

const isRomSizeValid = (file) => file.size === 41943040;

app.listen(PORT, () => {
    console.log(`Server listening on the port::${PORT}`);
});


function replaceGombarioWithParakarry() {
  fs.readFile('..\\StarRod\ Mod\\map\\patch\\kmr_02.mpat', 'utf8', (err, data) => {
    if (err) {
      return console.log(err);
    }
    var result = data.replace('$Function_80241E90 ( 00000002 00000001 )', '$Function_80241E90 ( 00000004 00000004 )');
    
    fs.writeFile('..\\StarRod\ Mod\\map\\patch\\kmr_02.mpat', result, 'utf8', function (err) {
       if (err) {
        return console.log(err);
       }
    });
  });
}