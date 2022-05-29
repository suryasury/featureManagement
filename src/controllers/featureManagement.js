const db = require("../models");
const { Feature, User, Group, UserFeature, GroupUsers, GroupFeatures } = db;
const Op = db.Sequelize.Op;

// Create a Feature
exports.createFeature = async (req, res) => {
  if (!req.body.featureName) {
    res.status(400).send(errorResponse("Content cannot be empty."));
    return;
  }
  const feature = {
    featureName: req.body.featureName,
    featureStatus: req.body.featureStatus,
  };
  try {
    var featureObj = await Feature.findOne({
      where: { featureName: req.body.featureName },
    });
    if (featureObj) {
      return res.send(errorResponse("Feature already exists."));
    }
    var res = await Feature.create(feature);
    res.send(res);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while creating the feature.",
    });
  }
};

// Create a User
exports.createUser = async (req, res) => {
  if (!req.body.userName) {
    res.status(400).send(errorResponse("Content cannot be empty."));
    return;
  }
  const user = {
    userName: req.body.userName,
    phoneNumber: req.body.phoneNumber,
  };

  try {
    var res = await User.create(user);
    res.send(res);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while creating User",
    });
  }
};

// Create a Group
exports.createGroup = async (req, res) => {
  if (!req.body.groupName) {
    res.status(400).send(errorResponse("Groupname cannot be empty."));
    return;
  }
  const feature = {
    groupName: req.body.groupName,
  };

  try {
    var groupObj = await Group.findOne({
      where: { groupName: req.body.groupName },
    });
    if (groupObj) {
      return res.send(errorResponse("Group name already exists."));
    }
    console.log("Group name", groupObj);
    var groupCreateRes = await Group.create(feature);
    res.send({ status: "OK", data: groupCreateRes });
  } catch (err) {
    res.status(500).send({
      message: err.message || "Error occurred while creating the Group.",
    });
  }
};

// Fetch all users
exports.fetchAllUsers = async (req, res) => {
  try {
    const result = await User.findAll();
    res.send(result);
  } catch (err) {
    res
      .status(500)
      .send(errorResponse(err.message || "Content cannot be empty."));
  }
};

// Assign a feature to a user
exports.assignFeatureToUser = async (req, res) => {
  if (!req.body.userId) {
    res.status(400).send(errorResponse("User Id cannot be empty."));
    return;
  }

  try {
    const userFeatureRes = await UserFeature.findOne({
      where: { userId: req.body.userId, featureId: req.body.featureId },
    });
    if (userFeatureRes) {
      return res.send(
        errorResponse("User is already associated with this given Feature.")
      );
    }
    const userRes = await User.findOne({ where: { userId: req.body.userId } });
    const featureRes = await Feature.findOne({
      where: { featureId: req.body.featureId },
    });
    if (userRes && featureRes) {
      var createRel = {
        featureId: req.body.featureId,
        userId: req.body.userId,
        featureStatus: req.body.featureStatus,
      };

      var cResult = await UserFeature.create(createRel);

      res.send({ status: "OK", data: cResult });
      return;
    }
    res.send(errorResponse("User Id or Feature Id is not valid."));
  } catch (err) {
    res
      .status(500)
      .send(
        errorResponse(
          err.message || "Error occurred while creating the feature."
        )
      );
  }
};

// Add Feature to a Group
exports.addFeatureToGroup = async (req, res) => {
  if (!req.body.groupId || !req.body.featureId || !req.body.featureStatus) {
    res.status(400).send(errorResponse("Content cannot be empty."));
    return;
  }
  try {
    const groupFeatureRes = await GroupFeatures.findOne({
      where: { groupId: req.body.groupId, featureId: req.body.featureId },
    });
    if (groupFeatureRes) {
      return res.send(
        errorResponse("Feature is already associated with this Group.")
      );
    }
    const groupRes = await Group.findOne({
      where: { groupId: req.body.groupId },
    });
    const featureRes = await Feature.findOne({
      where: { featureId: req.body.featureId },
    });
    if (groupRes && featureRes) {
      var createRel = {
        featureId: req.body.featureId,
        groupId: req.body.groupId,
        featureStatus: req.body.featureStatus,
      };

      var cResult = await GroupFeatures.create(createRel);

      res.send({ status: "OK", data: cResult });
      return;
    }
    res.send(errorResponse("Group Id or Feature Id is not valid."));
  } catch (err) {
    res
      .status(500)
      .send(
        errorResponse(
          err.message || "Error occurred while creating the feature."
        )
      );
  }
};

// Assign a user to a group
exports.assignUserToGroup = async (req, res) => {
  if (!req.body.groupId || !req.body.userId) {
    res.status(400).send(errorResponse("Content cannot be empty."));
    return;
  }

  try {
    const groupUserRes = await GroupUsers.findOne({
      where: { groupId: req.body.groupId, userId: req.body.userId },
    });
    if (groupUserRes) {
      return res.send(
        errorResponse("User is already associated with this Group.")
      );
    }
    const groupRes = await Group.findOne({
      where: { groupId: req.body.groupId },
    });
    const userRes = await User.findOne({
      where: { userId: req.body.userId },
    });
    if (groupRes && userRes) {
      var createRel = {
        userId: req.body.userId,
        groupId: req.body.groupId,
      };

      var cResult = await GroupUsers.create(createRel);

      res.send({ status: "OK", data: cResult });
      return;
    }
    res.send(errorResponse("Group Id or User Id is not valid."));
  } catch (err) {
    res
      .status(500)
      .send(
        errorResponse(
          err.message || "Error occurred while creating the feature."
        )
      );
  }
};

//Fetch users treatment
exports.fetchUserFeatures = async (req, res) => {
  if (!req.body.userId) {
    res.status(400).send(errorResponse("User ID cannot be empty."));
    return;
  }

  try {
    var resObj = {};
    var userRes = await User.findOne({ where: { userId: req.body.userId } });
    if (!userRes) {
      return res.send(errorResponse("User not found."));
    }
    var featureDefault = await Feature.findAll();

    //------------------------------------default treatment----------------------------//
    console.log("All", featureDefault);
    featureDefault.forEach((data) => {
      console.log("Each data", data.dataValues.featureName);
      var flagResult = evaluateFlag(data.dataValues.featureStatus);
      resObj[data.dataValues.featureName] = flagResult;
    });
    console.log("res obj stage-1", resObj);
    //-----------------------------------default treatment end-------------------------------//

    //-----------------------------------group level override--------------------------------//
    const groupUserRes = await GroupUsers.findAll({
      where: { userId: req.body.userId },
    });

    console.log("Group User", groupUserRes);

    const groupFeaturesRes = await GroupFeatures.findAll({
      where: {
        [Op.or]: groupUserRes.map((data) => {
          return { groupId: data.dataValues.groupId };
        }),
      },
    });

    console.log("Group user res", groupFeaturesRes);

    groupFeaturesRes.forEach((data) => {
      console.log("Each data", data.dataValues.groupId);

      var featureObj = featureDefault.find(
        (e) => e.dataValues.featureId === data.dataValues.featureId
      );
      var flagResult = evaluateFlagValue(
        featureObj.dataValues.featureStatus,
        data.dataValues.featureStatus
      );
      resObj[featureObj.dataValues.featureName] =
        flagResult ?? evaluateFlag(data.dataValues.featureStatus);
    });
    console.log("res obj stage-2", resObj);
    //-----------------------------------group level override ended---------------------------------//

    //-----------------------------------User level feature override-------------------------//
    const userFeatureRes = await UserFeature.findAll({
      where: { userId: req.body.userId },
    });
    console.log("User Feature", userFeatureRes);

    userFeatureRes.map((data) => {
      var featureObj = featureDefault.find(
        (e) => e.dataValues.featureId === data.dataValues.featureId
      );
      console.log("jjffff", featureObj);
      var flagResult = evaluateFlagValue(
        featureObj.dataValues.featureStatus,
        data.dataValues.featureStatus
      );

      resObj[featureObj.dataValues.featureName] =
        flagResult ?? evaluateFlag(data.dataValues.featureStatus);
    });
    //-----------------------------------User level feature override End-------------------------//

    res.send({ status: "OK", data: resObj });
  } catch (err) {
    console.log("REs err", err);
    res
      .status(500)
      .send(
        errorResponse(
          err.message ||
            "Some error occurred while retrieving user feature data."
        )
      );
  }
};

const evaluateFlagValue = (defaultValue, incomingValue) => {
  var defaultFlag = evaluateFlag(defaultValue);
  var incomingFlag = evaluateFlag(incomingValue);
  return defaultFlag === incomingFlag ? null : incomingFlag;
};

const evaluateFlag = (value) => {
  if (value.toLowerCase().includes("true") || value.toLowerCase().includes("y"))
    return true;
  if (
    value.toLowerCase().includes("false") ||
    value.toLowerCase().includes("n")
  )
    false;
  return value;
};

const errorResponse = (message) => {
  return {
    status: "ERROR",
    data: {
      message: message,
    },
  };
};
