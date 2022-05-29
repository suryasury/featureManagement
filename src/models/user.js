module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "users",
    {
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userName: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
      phoneNumber: {
        type: Sequelize.STRING(45),
        allowNull: false,
      },
    },
    { timestamps: false }
  );
  
  User.associate = (models) => {
    User.belongsToMany(models.Feature, {
      through: "userfeatures",
      foreignKey: "userId",
    });
  };

  return User;
};
