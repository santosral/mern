const express = require("express");

const recordRoutes = express.Router();

const dbo = require("../db/conn");

recordRoutes.route("/record").get(function (req, res) {
  let db_connect = dbo.getDb("devises");
  db_connect
    .collection("records")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

recordRoutes.route("/record/add").post(function (req, res) {
  let db_connect = dbo.getDb("devises");
  let myobj = {
    devise_name: req.body.devise_name,
    devise_field: req.body.devise_field,
    devise_description: req.body.devise_description,
    devise_image: req.body.devise_image,
    devise_availability: req.body.devise_availability,
  };
  db_connect.collection("records").insertOne(myobj, function (err, res) {
    if (err) throw err;
  });
});

recordRoutes.route("/update/:id").post(function (req, res) {
  let db_connect = dbo.getDb("devises");
  let myquery = { id: req.body.id };
  let newvalues = {
    $set: {
      devise_name: req.body.devise_name,
      devise_field: req.body.devise_field,
      devise_description: req.body.devise_description,
      devise_image: req.body.devise_image,
      devise_availability: req.body.devise_availability,
    },
  };
  db_connect
    .collection("records")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
    });
});

recordRoutes.route("/:id").delete((req, res) => {
  let db_connect = dbo.getDb("devises");
  var myquery = { id: req.body.id };
  db_connect.collection("records").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
  });
});

module.exports = recordRoutes;
