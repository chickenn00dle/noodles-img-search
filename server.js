const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const request = require('request');
const cheerio = require('cheerio');

const app = express();

const port = process.env.PORT;

// Redirect / to search on Bruce Lee
app.get('/', (req, res) => {
  res.writeHead(301, {
    Location: 'https://noodles-img-search.glitch.me/search/bruce%20lee?offset=10'
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
  
    addEntry(process.env.DBURL, search); // Insert search param if not in db
  
    params = '&q=' + search.replace(/\s/gi, '+'); // add seach keyword to param string
  
    // if there is an offset, set the offset variable
    if (offset.offset) {
      offset = offset.offset;
    } else {
      offset = 20;
    }
    
    params += '&num=' + offset; // add offset to param string
    url += params; // finalize url adding param string
    
    // make the request to google image search
    request(url, (err, data, doc) => {
      if (err) throw err;
      const $ = cheerio.load(doc); 
      let results = $('.images_table tr td');
      let response = [];
      
      // Scrape data from google image search tables
      $('.images_table tr td').each(function(){
        let json = {
          'url': '',
          'snippet': '',
          'thumbnail': ''
        };
        
        json.url = $(this).children().first().attr().href.replace(/^.*?(http.*?)&.*/gi, '$1');
        json.snippet = $(this).contents().text().replace(/^(.*?)[0-9].*/gi, '$1');
        json.thumbnail = $(this).children().first().children().first().attr().src;
        
        response.push(json); // Push individual result to response array
      });
      
      res.end(JSON.stringify(response, null, 3)); // End response with response arr

    });
});

app.get('/recent/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  
  // Connect to db
  MongoClient.connect(process.env.DBURL, (err, db) => {
    if (err) throw err;
    
    const collection = db.collection('img-search');
    
    // find all entries
    let cursor = collection.find().project({
      'term': 1,
      'when': 1,
      '_id': 0
    }).toArray((err, result) => {
      res.end(JSON.stringify(result, null, 3)); // add all entries to response
      db.close();
    });  
  });
});

// Connect to db, check for term, and insert if not present
function addEntry(dbUrl, term) {
  MongoClient.connect(dbUrl, (err, db) => {
    if (err) throw err;
    
    const collection = db.collection('img-search');
    
    let cursor = collection.find({
      'term': term
    }).limit(1).toArray((err, result) => {
      if (result.length == 0) {
        collection.insert({
          'term': term,
          'when': new Date()
        });
      }
    
      db.close();
    });  
  });
}


app.listen(port);

