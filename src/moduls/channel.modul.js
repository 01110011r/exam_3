import { Model, DataTypes } from "sequelize";
import { newSequelize } from "../config/index.js";

export class ChannelModel extends Model {}

ChannelModel.init(
  {
    c_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    channelname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    owner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "channels",
    sequelize: newSequelize,
    timestamps: true,
    paranoid: true,
    deletedAt: true,
  }
);
// ChannelModel.sync({alter:true});
