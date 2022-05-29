module.exports = (sequelize, Sequelize) => {
  const GroupFeatures = sequelize.define(
    "groupfeatures",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      featureId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: false,
      },
      groupId: {
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

  // Feature.associate = (models) => {
  //   Feature.belongsToMany(models.User, {
  //     through: "userfeatures",
  //     foreignId: "featureId",
  //     as: "users",
  //   });
  // };

  return GroupFeatures;
};
