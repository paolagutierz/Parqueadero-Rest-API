const express = require("express");
const router = express.Router();
const Vehicle = require("../models/vehicle.model");
const moment = require("moment");
const AppParams = require("../models/app_params.model");

router.post("/register", function (req, res) {
  /*if (!checkCapacity()) {
    res.status(400).send({ error: true, message: "The park is full" });
    return;
  }*/

  const new_vehicle = new Vehicle(req.body);
  //handles null error

  if (
    req.body.constructor === Object &&
    Object.keys(req.body).length === 0 &&
    req.body.placa === ""
  ) {
    console.log(req.body);
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Vehicle.create(new_vehicle, function (err, vehicleId) {
      if (err) {
        res.send(err);
      } else {
        res.json({
          error: false,
          message: "Vehicle added successfully!",
          data: vehicleId,
        });
      }
    });
  }
});

router.get("/:numberPlate", function (req, res) {
  Vehicle.findByNumberPlate(req.params.numberPlate, function (err, vehicles) {
    if (err) {
      res.send(err);
    } else {
      const vehicle = vehicles[0];
      if (vehicle && !vehicle.total) {
        const diffMilliseconds =
          moment().valueOf() - moment(vehicle.hora_entrada).valueOf();
        const diffMins = Math.round(
          ((diffMilliseconds % 86400000) % 3600000) / 60000
        );
        vehicle.total = diffMins * 100;
      } else if (!vehicle) {
        res.status(404);
      }
      res.json(vehicle);
    }
  });
});

router.put("/:id", function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Vehicle.update(
      req.params.id,
      new Vehicle(req.body),
      function (err, vehicle) {
        if (err) res.send(err);
        res.json({
          error: false,
          message: "Vehicle successfully updated",
        });
      }
    );
  }
});

router.get("/", function (req, res) {
  Vehicle.findAll(function (err, vehicles) {
    if (err) {
      res.send(err);
    } else {
      console.log("res", vehicles);
      res.send(vehicles);
    }
  });
});

/*function checkCapacity() {
  AppParams.findByKeyName("capacity", function (err, app_param) {
    if (err) {
      return false;
    } else {
      if (app_param) {
        const capacity = app_param.value_of;
        Vehicle.findAll(function (err, vehicles) {
          if (err) {
            return false;
          } else {
            console.log("go");
            return capacity > vehicles.length;
          }
        });
      } else {
        return false;
      }
    }
  });
}*/

module.exports = router;
