const dbConn = require("./../../config/db.config");
const moment = require("moment");

//Vehicle object create
const Vehicle = function (vehicle) {
  this.placa = vehicle.placa;
  this.hora_entrada = vehicle.hora_entrada ? vehicle.hora_entrada : moment();
  this.hora_salida = vehicle.hora_entrada ? moment() : null;
  this.estado = vehicle.estado ? "pagado" : "pendiente";
  this.total = vehicle.total;
};

Vehicle.create = function (newVehicle, result) {
  dbConn.query("INSERT INTO vehiculos set ?", newVehicle, function (err, res) {
    if (err) {
      console.log("error: ", err);
      result(err, null);
    } else {
      console.log(res.insertId);
      result(null, res.insertId);
    }
  });
};

Vehicle.findByNumberPlate = function (numberPlate, result) {
  dbConn.query(
    "Select * from vehiculos where placa = ? ",
    numberPlate,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res);
      }
    }
  );
};

Vehicle.update = function (numberPlate, vehicle, result) {
  dbConn.query(
    "UPDATE vehiculos SET hora_salida=?,estado=?,total=? WHERE placa = ?",
    [vehicle.hora_salida.format(), vehicle.estado, vehicle.total, numberPlate],
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

Vehicle.findAll = function (result) {
  dbConn.query(
    "Select * from vehiculos where estado = 'pendiente'",
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(null, err);
      } else {
        console.log("vehicles : ", res);
        result(null, res);
      }
    }
  );
};

module.exports = Vehicle;
