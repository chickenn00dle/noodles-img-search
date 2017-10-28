const express = require('express');
const fs = require('fs');
const request = require('request');
const app = express();

const port = process.env.PORT;


app.get('/:search', (req, res) => {
  const engineID = process.env.SEARCH_ENGINE_ID;
  const key = process.env.KEY;
  let search = req.params.search,
      query = req.query,
      url = 'https://www.google.com/search?tbm=isch';
  
  
  search = search.replace(/\s/gi, '+');
  url += '&q=' + search;
  
  
  
  request(url, (err, res) => {
    if (err) throw err;
    console.log(res.body);
  })
  
});

app.listen(port);

// https://www.google.com/searchtbm=isch

//  https://noodles-img-search.glitch.me/cat%20fails?offset=10

