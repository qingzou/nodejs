'use strict'

var http = require('http')
var request = require('request')
var argv = require('yargs').argv
var path = require('path')
var fs = require('fs')


//CLI host, port, url
var scheme = 'http://'
var localhost = '127.0.0.1'
var host = argv.host || localhost
var port = argv.port || (host === localhost ? 8000 : 80)
var destinationUrl = argv.url || scheme + host + ':' + port


//CLI log
var logPath = argv.log && path.join(__dirname, argv.log)
var getLogStream = ()=> logPath ? fs.createWriteStream(logPath) : process.stdout
let logStream = logPath ? fs.createWriteStream(logPath) : process.stdout


var echoServer = http.createServer((req,res) => {
   console.log('echoServer\n')
   for(let header in req.headers) {
      res.setHeader(header, req.headers[header])
    }
   req.pipe(res)

})
echoServer.listen(8000)
process.stdout.write('echoserver listening @127.0.0.1:8000\n')


var proxyServer = http.createServer((req,res) => {
   //console
   console.log(`Proxying request to: ${destinationUrl + req.url}` +'\n')
   //process stdout
   process.stdout.write(JSON.stringify(req.headers))
   //logfile or stdout
   logStream.write(JSON.stringify(req.headers))

   var url = `${destinationUrl}${req.url}`
   if (req.headers['x-destination-url']) {
       url = scheme + req.headers['x-destination-url']
   }
   let options = {
           //headers: req.headers,
           url: url
       }
   options.method = req.method
   console.log(options.method)

   //log to res:
   //req.pipe(request(options)).pipe(res)
   //log to stdout:
   //req.pipe(process.stdout)
   //log to file:
   req.pipe(req.headers).pipe(getLogStream())
   //log not to close
   //req.pipe(logStream, {end: false})
   //logStream.write('Request headers: ' + JSON.stringify(req.headers))

   //log to both stdout and res
   //let downstreamResponse = req.pipe(request(options))
   //process.stdout.write(JSON.stringify(downstreamResponse.headers))
   //downstreamResponse.pipe(process.stdout)
   //downstreamResponse.pipe(res)


})
proxyServer.listen(8001)
process.stdout.write('proxy server listening @127.0.0.1:8001\n')
