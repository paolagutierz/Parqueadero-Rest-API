const express = require("express");
const bodyParser = require("body-parser");
const vehicleRoutes = require("./src/routes/vehicle.routes");
const appParamsRoutes = require("./src/routes/app_params.routes");

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());

// define a root route
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/vehicle", vehicleRoutes);
app.use("/app_param", appParamsRoutes);

// listen for requests
app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
