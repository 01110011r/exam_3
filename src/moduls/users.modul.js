import { Sequelize, Model, DataTypes } from "sequelize";
import { newSequelize } from "../config/index.js";


export class UsersModel extends Model{};

UsersModel.init(
    {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
      },
      avatarka:{
        type:DataTypes.STRING
      },
      password:{
        type: DataTypes.STRING
      },
      username: {
        type: Sequelize.STRING,
        allowNull:false
      },
      first_name: {
        type: DataTypes.STRING,
      },
      second_name: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      }
    },
    {
        tableName: "users",
        sequelize:newSequelize,
        timestamps:true,
        paranoid:true,
        deletedAt:true
    }
);
// UsersModel.sync({alter:true});



// avatarka (ixtiyoriy)
// username
// first_name (ixtiyoriy)
// second_name (ixtiyoriy)
// description (ixtiyoriy)
