const express = require('express');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;
const fs = require('fs');

const users = [{"name": "userA"}];

app.use(bodyParser.json());

app.get('/api/patch', (req, res) => {
  const patchedRomPath = '..\\StarRod\ Mod\\out\\Paper Mario (USA).z64';
  
  const exec = require('child_process').exec;
  const childProcess = exec('java -jar ..\\StarRod\\StarRod.jar -CompileMod', {cwd: '..\\StarRod'}, function(err, stdout, stderr) {
    if (err) {
        console.log(err)
    }
  })
  childProcess.on('exit', function() {
    fs.exists(patchedRomPath, function(exists){
      if (exists) {     
        // Content-type is very interesting part that guarantee that
        // Web browser will handle response in an appropriate manner.
        res.writeHead(200, {
          "Content-Type": "application/octet-stream",
          "Content-Disposition": "attachment; filename=Paper\Mario.z64" 
        });
        const outFile = fs.createReadStream(patchedRomPath);
        outFile.on('end', () => fs.unlink(patchedRomPath, () => console.log('deleted file')))
        outFile.pipe(res);
      } else {
        res.writeHead(400, {"Content-Type": "text/plain"});
        res.end("ERROR File does not exist");
      }
    });
})
  
});

app.post('/api/user', (req, res) => {
  const user = req.body.user;
  users.push(user);
  res.json("user addedd");
});

app.get('/', (req,res) => {
    res.send('App Works !!!!');
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
