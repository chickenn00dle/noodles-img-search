const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

const app = express();

const port = process.env.PORT;


app.get('/:search', (req, res) => {
  if (req.query != 'favicon.ico') {
  
    let response = [],
        offset = req.query,
        search = req.params.search,
        url = 'https://www.google.com/search?tbm=isch',
        params;
  
    params = '&q=' + search.replace(/\s/gi, '+');
  
    if (offset.offset) {
      offset = offset.offset;
      params += '&num=' + offset;
    } else {
      offset = 100;
    }
  
    url += params;
    
    request(url, (err, res, data) => {
      if (err) throw err;
      const $ = cheerio.load(data); 
      let results = $('.images_table tr td a img');
      
      
      for (let i = 0; i < offset; i++) {
        let json = {
          'url': '',
          'snippet': '',
          'thumbnail': ''
        };
        
        console.log(results[i].parent);
      
        let imgURL = results[i].parent.attribs.href;
        imgURL = imgURL.replace(/^.*(http.*?)&.*/gi, '$1');
        json.url = imgURL;
        response.push(json);
      };
    
    });
  }
});

app.listen(port);

