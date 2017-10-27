const express = require('express');
const fs = require('fs');
const request = require('request');
const app = express();

const port = process.env.PORT;


app.get('/:search', (req, res) => {
  let search = req.params,
      query = req.query;
  
});

app.listen(port);

// https://noodles-img-search.glitch.me/lolcats%20funny?offset=10