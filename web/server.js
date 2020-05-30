const express = require('express');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;
const fs = require('fs-extra');
const exec = require('child_process').exec;

const multer  = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, '..\\'),
  filename: (req, file, cb) => cb(null, 'PM64.z64')
})
const upload = multer({storage: storage})

const patchedRomPath = '..\\WorkingDir\\out\\PM64.z64';
const cleanModPath = '..\\StarRod\ Mod\\'
const workingModPath = '..\\WorkingDir\\'
const cleanRomPath = '..\\PM64.z64'

app.use(bodyParser.urlencoded({
  extended: false
}));

app.post('/api/patch', upload.single('inputRom', 1), (request, result) => {
  if(!isRomSizeValid(request.file)) {
    result.writeHead(400, "invalidRom");
    result.end('Invalid Rom');
    return;
  } 

  fs.copy(cleanModPath, workingModPath)
  .then(() => {
    console.log('running starRod')
    const childProcess = exec('java -jar ..\\StarRod\\StarRod.jar -CompileMod', {cwd: '..\\StarRod'}, function(err, stdout, stderr) {
      console.log(stdout);
      if (err) {
        console.log(err)
      }
    })
    childProcess.on('exit', function() {
      fs.exists(patchedRomPath)
      .then((exists) => {
        if (exists) {     
          result.writeHead(200, {
            "Content-Type": "application/octet-stream",
            "Content-Disposition": "attachment; filename=Paper\Mario.z64" 
          });
          const outFile = fs.createReadStream(patchedRomPath);
          outFile.on('end', () => fs.remove(workingModPath)
          .then(() => fs.remove(cleanRomPath))
          .then(() => console.log('deleted workingDir and rom')))
          outFile.pipe(result);
        } else {
          result.writeHead(400, {"Content-Type": "text/plain"});
          result.end("ERROR File does not exist");
        }
      });
    })
  })
  .catch(err => {
    console.error(err)
  })
  
});

isRomSizeValid = (file) => file.size === 41943040;

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});


function replaceGombarioWithParakarry() {
  fs.readFile('..\\StarRod\ Mod\\map\\patch\\kmr_02.mpat', 'utf8', (err, data) => {
    if (err) {
      return console.log(err);
    }
    var result = data.replace('$Function_80241E90 ( 00000002 00000001 )', '$Function_80241E90 ( 00000004 00000004 )');
    console.log(index)
    
    fs.writeFile('..\\StarRod\ Mod\\map\\patch\\kmr_02.mpat', result, 'utf8', function (err) {
       if (err) {
        return console.log(err);
       }
    });
  });
}