const snowmen = {};
let snowLength = 0;
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};
const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};
const notFound = (request, response) => {
  const responseJSON = {
    message: "Couldn't find the page you were looking for.",
  };
  respondJSON(request, response, 404, responseJSON);
};
const makeSnowman = (request, response, body) => {
  const responseJSON = {
    message: 'Your snowman needs a name.',
  };
  if (!body.name) {
    return respondJSON(request, response, 400, responseJSON);
  }
  let responseCode = 204;
  if (!snowmen[body.name]) {
    responseCode = 201;
    snowmen[body.name] = {};
  }
  snowmen[body.name].hat = body.hat;
  snowmen[body.name].eye = body.eye;
  snowmen[body.name].nose = body.nose;
  snowmen[body.name].scarf = body.scarf;
  snowmen[body.name].arm = body.arm;
  snowmen[body.name].buttons = body.buttons;
  if (responseCode === 201) {
    responseJSON.message = 'Successfully created snowman.';
    snowLength++;
    return respondJSON(request, response, 201, responseJSON);
  }
  return respondJSONMeta(request, response, responseCode);
};
const getSnowmen = (request, response) => {
  const responseJSON = {
    snowmen,
  };
  const noSnowmen = {
    message: "You haven't built any snowmen yet.",
  };
  if (snowLength === 0) {
    respondJSON(request, response, 200, noSnowmen);
  } else {
    respondJSON(request, response, 200, responseJSON);
  }
};
module.exports = {
  notFound,
  getSnowmen,
  makeSnowman,
};
