module.exports = (sequelize, Sequelize) => {
  const Feature = sequelize.define(
    "feature",
    {
      featureId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      featureName: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      featureStatus: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
    },
    { timestamps: false }
  );

  Feature.associate = (models) => {
    Feature.belongsToMany(models.User, {
      through: "userfeatures",
      foreignId: "featureId",
    });
  };

  return Feature;
};
