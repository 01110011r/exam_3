import { ChannelModel } from "../moduls/channel.modul.js";
import { UsersModel } from "../moduls/users.modul.js";
import { jwtHelper } from "../utils/jwtoken.js";
import "dotenv/config";

export const createChannel = async (req, res) => {
  try {
    const { channelname } = req.body;
    const { token } = req.headers;
    const { id } = jwtHelper.verify(token, process.env.SECRET_KEY);
    let avatarka =
      "http://" +
      req.hostname +
      ":" +
      process.env.PORT +
      "/" +
      req.file.filename;
    if (!id)
      return res.send({
        msg: "faqat user channel create qilishi mumkin! :(",
      });

    if (!channelname)
      return res.send({
        msg: "channelname yo'q!",
      });

    const c_name = await ChannelModel.findOne({
      where: { channelname: channelname },
    });

    if (c_name)
      return res.send({
        msg: "channelname band!  :(",
      });

    const data = await ChannelModel.create({
      channelname,
      owner_id: id,
      avatar: avatarka,
    });

    res.status(201).json({
      status: 201,
      data,
    });
  } catch (error) {
    console.log("channelname controller --->" + error.message);
    res.send({
      error: error.message,
    });
  }
};

export const channelDelete = async (req, res) => {
  try {
    const { c_id } = req.params;
    const { token } = req.headers;
    const { id } = jwtHelper.verify(token, process.env.SECRET_KEY);

    if (!id)
      return res.send({
        msg: "sizda channel yo'q, faqat user channel create qilishi mumkin! :(",
      });

    const channel = await ChannelModel.findOne({ where: { c_id: c_id } });

    if (!channel || channel.owner_id != id)
      return res.send({
        msg: "channelni faqat egasi o'chirishi mumkin! :(",
      });

    const data = await ChannelModel.destroy({
      where: {
        c_id: c_id,
      },
    });

    res.json({
      data: data == 1 ? "delete" : data,
    });
  } catch (error) {
    console.log("channel controller --->" + error.message);
    res.send({
      error: error.message,
    });
  }
};

export const channelGet = async (req, res) => {
  try {
    const { token } = req.headers;
    const { id } = jwtHelper.verify(token, process.env.SECRET_KEY);

    if (!id)
      return res.send({
        msg: "siz user emassiz, channel create qilolmaysiz!  :(",
      });

    const data = await ChannelModel.findAll({ where: { owner_id: id } });

    res.send({
      data,
    });
  } catch (error) {
    console.log("channel controller -->" + error.message);
    res.send({
      error: error.message,
    });
  }
};

export const channelGetAll = async (req, res) => {
  try {
    const data = await ChannelModel.findAll({ include: UsersModel });

    res.send({ data });
  } catch (error) {
    console.log("channel controller ---> " + error.message);
    res.send({
      error: error.message,
    });
  }
};

export const updateChannel = async (req, res) => {
  try {
    const { c_id } = req.params;
    const { token } = req.headers;
    const { id } = jwtHelper.verify(token, process.env.SECRET_KEY);
    let avatarka =
      "http://" +
      req.hostname +
      ":" +
      process.env.PORT +
      "/" +
      req.file.filename;

    const newData = req.body;
    newData.avatar = avatarka;
    if (!id)
      return res.send({
        msg: "sizda channel yo'q, faqat user channel create qilishi mumkin! :(",
      });

    const channel = await ChannelModel.findOne({ where: { c_id: c_id } });

    if (!channel || channel.owner_id != id)
      return res.send({
        msg: "sizda bunday channel yo'q! :(",
      });


    const data = await ChannelModel.update(newData, { where: { c_id: c_id } });

    res.json({
      protcess_code: data[0],
      newData,
    });
  } catch (error) {
    console.log("channel controller --->" + error.message);
    res.send({
      error: error.message,
    });
  }
};
