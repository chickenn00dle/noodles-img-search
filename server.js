const express = require('express');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

const app = express();

const port = process.env.PORT;


app.get('/search/:search', (req, res) => {
    
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
      
      console.log(doc);
      
      for (let i = 0; i < offset; i++) {
        let json = {
          'url': '',
          'snippet': '',
          'thumbnail': ''
        };

        
        json.url = results[i].children[0].attribs.href.replace(/^.*(http.*?)&.*/, '$1');
        if (results[i].children[4].data) {
          json.snippet = results[i].children[4].data;
        } else if (results[i].children[5].data) {
          json.snippet = results[i].children[5].data;
        } else {
          json.snippet = 'not available';
        }
        json.thumbnail = results[i].children[0].children[0].attribs.src;
        
        response.push(json);
        
        // console.log($('.images_table').children().first().text());
        
        
      }
      
      res.end(JSON.stringify(response, null, 3));

    });
});

app.listen(port);

