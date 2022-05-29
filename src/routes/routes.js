module.exports = (app) => {
  const features = require("../controllers/featureManagement.js");
  const db = require('../models')

  var router = require("express").Router();

  router.post("/addFeature", features.createFeature);

  router.post("/addUser", features.createUser);

  router.post("/createGroup", features.createGroup);

  router.post("/assignFeatureToUser", features.assignFeatureToUser);

  router.post("/fetchUserFeatures", features.fetchUserFeatures);

  router.get("/getAllUsers", features.fetchAllUsers);

  app.use("/api/feature", router);
};
