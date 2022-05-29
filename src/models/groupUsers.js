module.exports = (sequelize, Sequelize) => {
  const GroupUsers = sequelize.define(
    "groupusers",
    {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
      },
      groupId: {
        type: Sequelize.INTEGER,
      },
    },
    { timestamps: false }
  );

  // GroupUsers.associate = (models) => {
  //   GroupUsers.belongsToMany(models.User, {
  //     through: "userfeatures",
  //     foreignId: "featureId",
  //     as: "users",
  //   });
  // };

  return GroupUsers;
};
