import { Model, DataTypes } from "sequelize";
import { newSequelize } from "../config/index.js";

export class GroupModel extends Model {}

GroupModel.init(
  {
    g_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    groupname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "groups",
    sequelize: newSequelize,
    timestamps: true,
    paranoid: true,
    deletedAt: true,
  }
);
// GroupModel.sync({alter:true});
