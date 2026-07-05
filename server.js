const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;

const MIME = {'.html':'text/html','.js':'text/javascript','.css':'text/css','.png':'image/png','.ico':'image/x-icon'};

http.createServer((req, res) => {
  let url = req.url === '/' ? '/index.html' : req.url;
  let fp = path.join(__dirname, url);
  fs.readFile(fp, (err, data) => {
    if (err) {
      res.writeHead(404, {'Content-Type':'text/plain'});
      res.end('Not found');
      return;
    }
    const ct = MIME[path.extname(fp)] || 'text/plain';
    res.writeHead(200, {'Content-Type': ct});
    res.end(data);
  });
}).listen(PORT, () => console.log('Server running on port ' + PORT));