
module.exports = (sequelize, Sequelize) => {
    const Feature = sequelize.define("groups", {
      groupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
        
      },
      groupName:{
        type:Sequelize.STRING(45),
        allowNull: false,
      },
    }, { timestamps: false});
  
    return Feature;
  };