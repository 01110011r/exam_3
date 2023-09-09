import { Model, DataTypes } from "sequelize";
import { newSequelize } from "../config/index.js";

export class SubscribeModelGroup extends Model {}

SubscribeModelGroup.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    tableName: "subscribes_group",
    sequelize: newSequelize,
    timestamps: false,
  }
);