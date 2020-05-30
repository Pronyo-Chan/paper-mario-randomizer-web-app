const express = require('express');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;
const fs = require('fs');

const multer  = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, '..\\'),
  filename: (req, file, cb) => cb(null, 'Paper Mario (USA).z64')
})
const upload = multer({storage: storage})

app.use(bodyParser.urlencoded({
  extended: false
}));

app.post('/api/patch', upload.single('inputRom', 1), (request, result) => {
  if(!isRomSizeValid(request.file)) {
    result.writeHead(400, "invalidRom");
    result.end('Invalid Rom');
    return;
  }
  const patchedRomPath = '..\\StarRod\ Mod\\out\\Paper Mario (USA).z64';
  console.log(request.file);
  
  const exec = require('child_process').exec;
  const childProcess = exec('java -jar ..\\StarRod\\StarRod.jar -CompileMod', {cwd: '..\\StarRod'}, function(err, stdout, stderr) {
    if (err) {
        console.log(err)
    }
  })
  childProcess.on('exit', function() {
    fs.exists(patchedRomPath, function(exists){
      if (exists) {     
        result.writeHead(200, {
          "Content-Type": "application/octet-stream",
          "Content-Disposition": "attachment; filename=Paper\Mario.z64" 
        });
        const outFile = fs.createReadStream(patchedRomPath);
        outFile.on('end', () => fs.unlink(patchedRomPath, () => console.log('deleted file')))
        outFile.pipe(result);
      } else {
        result.writeHead(400, {"Content-Type": "text/plain"});
        result.end("ERROR File does not exist");
      }
    });
  })
  
});

isRomSizeValid = (file) => file.size === 41943040;

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
