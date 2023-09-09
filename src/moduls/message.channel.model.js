import { Model, DataTypes } from "sequelize";
import { newSequelize } from "../config/index.js";

export class MessageChannelModel extends Model {}

MessageChannelModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    tableName: "message_channel",
    sequelize: newSequelize,
    timestamps: false,
  }
);