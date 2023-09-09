import { Model, DataTypes } from "sequelize";
import { newSequelize } from "../config/index.js";

export class SubscribeModel extends Model {}

SubscribeModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    tableName: "subscribes_channel",
    sequelize: newSequelize,
    timestamps: false,
  }
);