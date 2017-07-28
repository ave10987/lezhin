const express = require('express');
const path = require('path');
const fs = require('fs');
const port = '8888';

const app = express();

app.use('/', express.static(path.join( __dirname, '../client')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '../client/index.html'));
});

app.get('/banner', (req, res) => {
  let device = req.query.device;
  let dataUrl = "";
  const count = req.query.count || undefined;

  if( device !== 'desktop' && device !== 'mobile' ) {
    device = 'mobile';
  }

  dataUrl = path.join(__dirname + '/db/' + device + '.json');

  fs.readFile(dataUrl, 'utf8', ( error, data ) => {
    let parsedData = JSON.parse( data );
    if( count >= 0 && count <= parsedData.length ) {
      parsedData = parsedData.slice(0, count);
    }

    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify(parsedData));
    res.end();
  });
});

console.log('> Starting dev server...');
app.listen(port, () => {
	console.log('Listening on port 8888');
});