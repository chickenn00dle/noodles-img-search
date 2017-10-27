const express = require('express');
const fs = require('fs');
const request = require('request');
const app = express();

const port = process.env.PORT;

app.get('/:search', (req, res) => {
  let search = req.params,
      query = req.query;
  console.log(search); 
  console.log(query);
});

app.listen(port);

// https://noodles-img-search.glitch.me/lolcats%20funny?offset=10

// req = {
//     _startTime     :    Date, 
//     app            :    function(req,res){},
//     body           :    {},
//     client         :    Socket,
//     complete       :    Boolean,
//     connection     :    Socket,
//     cookies        :     {},
//     files          :     {},
//     headers        :    {},
//     httpVersion    :    String,
//     httpVersionMajor    :    Number,
//     httpVersionMinor    :     Number,
//     method         :    String,  // e.g. GET POST PUT DELETE
//     next           :    function next(err){},
//     originalUrl    :    String,     /* e.g. /erer?param1=23¶m2=45 */
//     params         :    [],
//     query          :    {},
//     readable       :    Boolean,
//     res            :    ServerResponse,
//     route          :    Route,
//     signedCookies  :    {},
//     socket         :    Socket,
//     url            :    String /*e.g. /erer?param1=23¶m2=45 */
// }

// res = {
//     app            :    function(req, res) {},
//     chunkedEncoding:    Boolean,
//     connection     :     Socket,
//     finished       :    Boolean,
//     output         :    [],
//     outputEncodings:    [],
//     req            :    IncomingMessage,
//     sendDate       :    Boolean,
//     shouldkeepAlive    : Boolean,
//     socket         :     Socket,
//     useChunkedEncdoingByDefault    :    Boolean,
//     viewCallbacks  :    [],
//     writable       :     Boolean
// }