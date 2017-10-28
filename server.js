const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

const app = express();

const port = process.env.PORT;


app.get('/:search', (req, res) => {
  if (req.params.search != 'favicon.ico') {
  
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
    
    request(url, (err, res, data) => {
      if (err) throw err;
      const $ = cheerio.load(data); 
      let results = $('.images_table tr td')
      
      for (let i = 0; i < offset; i++) {
        let json = {
          'url': '',
          'snippet': '',
          'thumbnail': ''
        };
        
        console.log(i + 1);
        console.log(results[i].children);
        console.log(' ');
        
      }
      

    });
  }
});

app.listen(port);

