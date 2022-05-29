
module.exports = (sequelize, Sequelize) => {
  const UserFeatures = sequelize.define(
    "userfeatures",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: false,
      },
      featureId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: false,
      },
      featureStatus: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  UserFeatures.associate = (models) => {
    UserFeatures.belongsTo(models.User, { foreignKey: "userId" });
    UserFeatures.belongsTo(models.Feature, { foreignKey: "featureId" });
  };

  return UserFeatures;
};
