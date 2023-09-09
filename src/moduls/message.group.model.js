import { Model, DataTypes } from "sequelize";
import { newSequelize } from "../config/index.js";

export class MessageGroupModel extends Model {}

MessageGroupModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    tableName: "message_group",
    sequelize: newSequelize,
    timestamps: false,
  }
);
// MessageGroupModel.sync({alter:true})
