const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

const app = express();

const port = process.env.PORT;


app.get('/:search', (req, res) => {
  if (req.params.search != 'favicon.ico') {
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
  
    let response = [],
        offset = req.query,
        search = req.params.search,
        url = 'https://www.google.com/search?tbm=isch',
        params;
  
    params = '&q=' + search.replace(/\s/gi, '+');
  
    if (offset.offset) {
      offset = offset.offset;
    } else {
      offset = 20;
    }
    
    params += '&num=' + offset;
    url += params;
    
    request(url, (err, data, doc) => {
      if (err) throw err;
      const $ = cheerio.load(doc); 
      let results = $('.images_table tr td');
      let response = [];
      
      for (let i = 0; i < offset; i++) {
        let json = {
          'url': '',
          'snippet': '',
          'thumbnail': ''
        };
        
        console.log('0: ');
        console.log(results[i].children[0]);
        console.log('==================');
        console.log('1: ');
        console.log(results[i].children[1]);
        console.log('==================');
        console.log('2: ');
        console.log(results[i].children[2]);
        console.log('==================');
        console.log('3: ');
        console.log(results[i].children[3]);
        console.log('==================');
        console.log('4: ');
        console.log(results[i].children[4]);
        console.log('==================');
        console.log('5: ');
        console.log(results[i].children[5]);
        console.log('==================');
        console.log('6: ');
        console.log(results[i].children[6]);
        console.log('==================');
        console.log('7: ');
        console.log(results[i].children[7]);
        console.log('==================');
        console.log(' ');

        
        // .replace(/^.*(http.*?)&.*/, '$1')
        
        
      }
      
      // res.end(JSON.stringify(response, null, 3));

    });
  }
});

app.listen(port);

