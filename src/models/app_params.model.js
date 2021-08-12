const dbConn = require("./../../config/db.config");

const AppParams = function (appParam) {
  this.key_name = appParam.key_name;
  this.value_of = appParam.value_of;
};

AppParams.create = function (newParam, result) {
  dbConn.query(
    "INSERT INTO app_parametros set ?",
    newParam,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        console.log(res.insertId);
        result(null, res.insertId);
      }
    }
  );
};

AppParams.update = function (id, value_of, result) {
  dbConn.query(
    "UPDATE app_parametros SET value_of=? WHERE id = ?",
    [value_of, id],
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

AppParams.findByKeyName = function (key_name, result) {
  dbConn.query(
    "Select * from app_parametros where key_name = ? ",
    key_name,
    function (err, res) {
      if (err) {
        console.log("error: ", err);
        result(err, null);
      } else {
        result(null, res[0]);
      }
    }
  );
};

module.exports = AppParams;
