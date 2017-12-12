var BodyParser = require('body-parser');
//var Config = require('config');
var Express = require('express');
var Routes = require('./app/routes/routes');
var Swagger = require('swagger-node-express');

var app = Express();

app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json({ strict: false}));
app.use("/docs", Express.static("swagger"));
app.use("/api/v1", Routes);

app.disable('x-powered-by');

Swagger.setAppHandler(app);
Swagger.setApiInfo({
  title: "Barbeque Bus Kitchen",
  description: "The BBQ Kitchen to serve delicious barbeque",
  termsOfServiceUrl: "",
  contact: "brett@spradling.me",
  license: "",
  licenseUrl: ""
});

Swagger.configure('http://localhost:8080/docs', '1.0.0');

app.get('/docs', function(request, response) {
    response.sendFile(__dirname + "/swagger/index.html");
});

var meats = {
  BRISKET: {
    quantity: 10
  },
  SAUSAGE: {
    quantity: 10
  },
  RIBS: {
    quantity: 10
  },
  CHICKEN: {
    quantity: 10
  }
}

var sides = {
  BEANS: {
    quantity: 5
  },
  MACARONI: {
    quantity: 5
  }
}

app.kitchen = {};
app.kitchen.meats = meats;
app.kitchen.sides = sides;

var appPort = process.env.APP_PORT || 8080;
var appInstance = app.listen(appPort);

console.log("API running in %s on port %d", "development"/*Config.get('environment')*/, appPort);

module.exports = app;