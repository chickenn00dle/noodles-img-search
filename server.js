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
    
    request(url, (err, res, doc) => {
      if (err) throw err;
      const $ = cheerio.load(doc); 
      let anchor = $('.images_table tr td a');
      let img = $('.images_table tr td a img');
      let snippet = $('.images_table tr td br');
      
      for (let i = 0; i < offset; i++) {
        let json = {
          'url': '',
          'snippet': '',
          'thumbnail': ''
        };
        
        json.url = anchor[i].attribs.href.replace(/^.*(http.*?)&.*/, '$1');
        json.thumbnail = img[i].attribs.src;
        
        console.log(snippet[i]);
        console.log('=====================\n\n');
        
        
        
      }
      

    });
  }
});

app.listen(port);

