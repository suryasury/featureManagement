const databaseConfig = require("../../config/database_config.js");

const Sequelize = require("sequelize");
const sequelizeInstance = new Sequelize(databaseConfig.DB, databaseConfig.USER, databaseConfig.PASSWORD, {
  host: databaseConfig.HOST,
  dialect: databaseConfig.dialect,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelizeInstance;

db.Feature = require("./features.js")(sequelizeInstance, Sequelize);
db.User = require("./user.js")(sequelizeInstance, Sequelize)
db.Group = require("./groups.js")(sequelizeInstance, Sequelize)
db.UserFeature = require("./assignFeatureToUser")(sequelizeInstance, Sequelize)
db.GroupUsers = require("./groupUsers")(sequelizeInstance, Sequelize)
db.GroupFeatures = require("./groupFeature")(sequelizeInstance, Sequelize)

sequelizeInstance.sync()

module.exports = db;