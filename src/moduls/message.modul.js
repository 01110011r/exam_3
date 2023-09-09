import { Model, DataTypes } from "sequelize";
import { newSequelize } from "../config/index.js";

export class MessageModel extends Model {}

MessageModel.init(
  {
    m_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    who_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    tableName: "messages",
    sequelize: newSequelize,
    timestamps: true,
    paranoid: true,
    deletedAt: true,
  }
);
// MessageModel.sync({alter:true})
