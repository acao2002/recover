
const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const {spawn} = require('child_process');
const app     = express();
const cors = require('cors');
const fs = require('fs');

console.log('This is after the read call');

app.use(cors({origin: 'http://localhost:3000/'}));

/*
app.get('/', cors(), function(req, res) {
  //run python  
  fs.readFile('info.json', (err, data) => {
    if (err) throw err;
    let info = JSON.parse(data);
    res.send(info);
  });
});
*/
app.get('/', (req, res) => {
 
  var dataToSend;
  // spawn new child process to call the python script
  const python = spawn('python', ['test.py']);
  // collect data from script
  python.stdout.on('data', function (data) {
   console.log('Pipe data from python script ...');
   dataToSend = data.toString();
  });
  // in close event we are sure that stream from child process is closed
  python.on('close', (code) => {
  console.log(`child process close all stdio with code ${code}`);
  // send data to browser
  res.send(dataToSend)
  });
})

app.listen(process.env.PORT || 8080);
console.log('API is running on http://localhost:8080');
module.exports = app;