const express = require("express");
const router = express.Router();
const AppParams = require("../models/app_params.model");

router.post("/add", function (req, res) {
  const new_app_param = new AppParams(req.body);
  //handles null error

  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    AppParams.create(new_app_param, function (err, app_param_id) {
      if (err) {
        res.send(err);
      } else {
        res.json({
          error: false,
          message: "App Param added successfully!",
          data: app_param_id,
        });
      }
    });
  }
});

router.get("/:key_name", function (req, res) {
  AppParams.findByKeyName(req.params.key_name, function (err, app_param) {
    if (err) {
      res.send(err);
    } else {
      if (app_param) {
        res.json(app_param);
      } else {
        res.status(404);
      }
    }
  });
});

router.put("/:id", function (req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    AppParams.update(
      req.params.id,
      new AppParams(req.body),
      function (err, app_param) {
        if (err) res.send(err);
        res.json({
          error: false,
          message: "App param successfully updated",
        });
      }
    );
  }
});

module.exports = router;
