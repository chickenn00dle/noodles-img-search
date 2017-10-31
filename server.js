const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const request = require('request');
const cheerio = require('cheerio');

const app = express();

const port = process.env.PORT;

app.get('/', (req, res) => {
  res.writeHead(301, {
    Location: 'https://noodles-img-search.glitch.me/search/lolcats%20funny?offset=10'
  });
  
  res.end();
});

app.get('/search/:search', (req, res) => {
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
  
    let response = [],
        offset = req.query,
        search = req.params.search,
        url = 'https://www.google.com/search?tbm=isch',
        params;
  
    addEntry(process.env.DBURL, search);
  
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
      
      $('.images_table tr td').each(function(){
        let json = {
          'url': '',
          'snippet': '',
          'thumbnail': ''
        };
        
        json.url = $(this).children().first().attr().href.replace(/^.*?(http.*?)&.*/gi, '$1');
        json.snippet = $(this).contents().text().replace(/^(.*?)[0-9].*/gi, '$1');
        json.thumbnail = $(this).children().first().children().first().attr().src;
        
        response.push(json);
      });
      
      res.end(JSON.stringify(response, null, 3));

    });
});

function addEntry(dbUrl, term) {
  MongoClient.connect(dbUrl, (err, db) => {
    if (err) throw err;
    
    const collection = db.collection('img-search');
    
    let cursor = collection.find({
      'term': term
    }).limit(1).toArray();
    
    if (cursor.length == 0) {
      collection.insert({
        'term': term,
        'when': new Date("<YYYY-mm-ddTHH:MM:ssZ>")
      });
      console.log('insertion complete');
    } else {
      console.log('Term exists in database');
    }
    
    db.close();
  });
}

app.listen(port);

