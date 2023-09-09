import { newSequelize } from "../config/index.js";
import { ChannelModel } from "./channel.modul.js";
import { GroupModel } from "./group.modul.js";
import { MessageChannelModel } from "./message.channel.model.js";
import { MessageGroupModel } from "./message.group.model.js";
import { MessageModel } from "./message.modul.js";
import { SubscribeModel } from "./subscribe.channel.model.js";
import { SubscribeModelGroup } from "./subscribe.group.model.js";
import { UsersModel } from "./users.modul.js";

// connecting tables
ChannelModel.belongsToMany(UsersModel, {
  through: SubscribeModel,
  foreignKey: "channel_id",
});

UsersModel.belongsToMany(ChannelModel, {
  through: SubscribeModel,
  foreignKey: "user_id",
});

UsersModel.belongsToMany(GroupModel, {
  through: SubscribeModelGroup,
  foreignKey: "user_id",
});

GroupModel.belongsToMany(UsersModel, {
  through: SubscribeModelGroup,
  foreignKey: "group_id",
});

MessageModel.belongsToMany(GroupModel, {
  through: MessageGroupModel,
  foreignKey: "message_id",
});

GroupModel.belongsToMany(MessageModel, {
  through: MessageGroupModel,
  foreignKey: "group_id",
});

MessageModel.belongsToMany(ChannelModel, {
  through: MessageChannelModel,
  foreignKey: "message_id",
});

ChannelModel.belongsToMany(MessageModel, {
  through: MessageChannelModel,
  foreignKey: "channel_id",
});

newSequelize.sync({ alter: true });

export {
  MessageModel,
  ChannelModel,
  GroupModel,
  SubscribeModel,
  SubscribeModelGroup,
  UsersModel,
  MessageGroupModel,
  MessageChannelModel
};
