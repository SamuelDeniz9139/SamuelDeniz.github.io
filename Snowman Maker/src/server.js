const http = require('http');
const query = require('querystring');
const url = require('url');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;
const parseBody = (request, response, handler) => {
  const body = [];
  request.on('error', () => {
    response.statusCode = 400;
    response.end();
  });
  request.on('data', (chunk) => {
    body.push(chunk);
  });
  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = query.parse(bodyString);
    handler(request, response, bodyParams);
  });
};
const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/makeSnowman') {
    parseBody(request, response, jsonHandler.makeSnowman);
  }
};
const handleGet = (request, response, parsedUrl) => {
  const newUrl = parsedUrl.pathname;
  if (newUrl === '/style.css') {
    htmlHandler.getCSS(request, response);
  } else if (newUrl.includes('/images')) {
    htmlHandler.getImage(request, response, newUrl);
  } else if (newUrl.includes('/fonts')) {
    htmlHandler.getFont(request, response, newUrl);
  } else if (newUrl === '/getSnowmen') {
    jsonHandler.getSnowmen(request, response);
  } else {
    htmlHandler.getIndex(request, response);
  }
};
const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  if (request.method === 'POST') {
    handlePost(request, response, parsedUrl);
  } else {
    handleGet(request, response, parsedUrl);
  }
};
http.createServer(onRequest).listen(port, () => {
  console.log(`Listening on 127.0.0.1:${port}`);
});
