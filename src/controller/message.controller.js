import {
  MessageChannelModel,
  MessageGroupModel,
  GroupModel,
  ChannelModel,
} from "../moduls/main.modul.js";
import { MessageModel } from "../moduls/message.modul.js";
import { jwtHelper } from "../utils/jwtoken.js";
import "dotenv/config";

export const messageSet = async (req, res) => {
  try {
    const { ch_id } = req.params;
    const { token } = req.headers;
    const { id } = jwtHelper.verify(token, process.env.SECRET_KEY);
    const { message } = req.body;

    if (!message || message.trim() == "")
      return res.send({
        msg: "message xato!  :(",
      });

    const isChannel = await ChannelModel.findOne({ where: { c_id: ch_id } });

    if (isChannel && isChannel.owner_id == id) {
      const data = await MessageModel.create({
        message,
        who_id: id,
      });
      await MessageChannelModel.create({
        message_id: data.m_id,
        channel_id: ch_id,
      });
      return res.send({
        data,
      });
    }
    const isGroup = await GroupModel.findOne({
      where: { ch_id },
    });

    if (isGroup) {
      const data = await GroupModel.create({
        message,
        who_id: id,
        ch_id,
      });
      await MessageGroupModel.create({
        message_id: data.m_id,
        group_id: ch_id,
      });
      return res.send({
        data,
      });
    }

    return res.send({
      msg: "group not found!   :(",
    });
  } catch (error) {
    console.log("subscribe controller---> " + error.message);
    res.send({
      error: error.message,
    });
  }
};
