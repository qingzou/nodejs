#Proxy Server

This is a Proxy Server for Node.js submitted as the [pre-work](http://courses.codepath.com/snippets/intro_to_nodejs/prework) requirement for CodePath.

Time spent: [10 hours]

Completed:

* [X] Required: Requests to port `8000` are echoed back with the same HTTP headers and body
* [X] Required: Requests/reponses are proxied to/from the destination server
* [X] Required: The destination server is configurable via the `--host`, `--port`  or `--url` arguments
* [X] Required: The destination server is configurable via the `x-destination-url` header
* [X] Required: Client requests and respones are printed to stdout
* [X] Required: The `--logfile` argument outputs all logs to the file specified instead of stdout
* [X] Optional: The `--exec` argument proxies stdin/stdout to/from the destination program
* [] Optional: The `--loglevel` argument sets the logging chattiness
* [] Optional: Supports HTTPS
* [X] Optional: `-h` argument prints CLI API

Walkthrough Gif:
[Add walkthrough.gif to the project root]

![Video Walkthrough](walkthrough.gif)

Note: to embed the gif file, just check your gif file into your repo and update the name of the file above.

## Starting the Server

```bash
nodemon index.js
```

## Features

### Echo Server:
L-SB871RTG8W-M:ProxyServer qzou3$ curl http://127.0.0.1:8000/ -d "hello echo server" -H 'x-asdf:qzou3' -v
*   Trying 127.0.0.1...
* Connected to 127.0.0.1 (127.0.0.1) port 8000 (#0)
> POST / HTTP/1.1
> Host: 127.0.0.1:8000
> User-Agent: curl/7.47.1
> Accept: */*
> x-asdf:qzou3
> Content-Length: 17
> Content-Type: application/x-www-form-urlencoded
> 
* upload completely sent off: 17 out of 17 bytes
< HTTP/1.1 200 OK
< host: 127.0.0.1:8000
< user-agent: curl/7.47.1
< accept: */*
< x-asdf: qzou3
< content-length: 17
< content-type: application/x-www-form-urlencoded
< Date: Sat, 05 Mar 2016 23:32:35 GMT
< Connection: keep-alive
< 
* Connection #0 to host 127.0.0.1 left intact


### Proxy Server:

Port 8001 will proxy to the echo server on port 8000.

```bash

L-SB871RTG8W-M:ProxyServer qzou3$ curl http://127.0.0.1:8001/asdf -d "hello proxy server" -H 'x-asdf:qzou3' -v
*   Trying 127.0.0.1...
* Connected to 127.0.0.1 (127.0.0.1) port 8001 (#0)
> POST /asdf HTTP/1.1
> Host: 127.0.0.1:8001
> User-Agent: curl/7.47.1
> Accept: */*
> x-asdf:qzou3
> Content-Length: 18
> Content-Type: application/x-www-form-urlencoded
> 
* upload completely sent off: 18 out of 18 bytes
< HTTP/1.1 200 OK
< host: 127.0.0.1:8000
< user-agent: curl/7.47.1
< accept: */*
< x-asdf: qzou3
< content-length: 18
< content-type: application/x-www-form-urlencoded
< connection: close
< date: Sat, 05 Mar 2016 23:35:39 GMT
< 
* Closing connection 0
hello proxy server
```

### Configuration:

#### CLI Arguments:

The following CLI arguments are supported:

##### `--host`

The host of the destination server. Defaults to `127.0.0.1`.

##### `--port`

The port of the destination server. Defaults to `80` or `8000` when a host is not specified.

##### `--url`

A single url that overrides the above. E.g., `http://www.google.com`

##### `--logfile`

Specify a file path to redirect logging to.

#### Headers

The follow http header(s) are supported:

##### `x-destination-url`

Specify the destination url on a per request basis. Overrides and follows the same format as the `--url` argument.


