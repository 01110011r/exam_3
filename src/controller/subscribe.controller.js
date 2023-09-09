import {
  ChannelModel,
  SubscribeModel,
  SubscribeModelGroup,
} from "../moduls/main.modul.js";
import { jwtHelper } from "../utils/jwtoken.js";
import "dotenv/config";

export const Subscribe = async (req, res) => {
  try {
    const { s_id } = req.params;
    const { token } = req.headers;
    const { id } = jwtHelper.verify(token, process.env.SECRET_KEY);

    if (!id)
      return res.send({
        msg: "invalit token!  :(",
      });

    if (!s_id)
      return res.send({
        msg: "page id not found! :(",
      });

    const isChannel = (await ChannelModel.findOne({ where: { c_id: s_id } }))
      ? true
      : false;
    // const validation = await SubscribeModel.findOne({
    //   where: { id: s_id, user_id: id },
    // });
    if (isChannel) {
      await SubscribeModel.create({ user_id: id, channel_id: s_id });
    }
    else{
        await SubscribeModelGroup.create({ user_id: id, group_id: s_id });
    }    

    res.send({
      msg: "Subscribe",
    });
  } catch (error) {
    console.log("subscribe controller---> " + error.message);
    res.send({
      error: error.message,
    });
  }
};

export const unSubscribe = async (req, res) => {
  try {
    const { s_id } = req.params;
    const { token } = req.headers;
    const { id } = jwtHelper.verify(token, process.env.SECRET_KEY);

    const destroy = await SubscribeModel.destroy({
      where: { what_id: s_id, user_id: id },
    });

    res.send({
      protcess_code: destroy,
      msg: "unsubscribe",
    });
  } catch (error) {
    console.log("subscribe controller---> " + error.message);
    res.send({
      error: error.message,
    });
  }
};

export const mySubscriptions = async (req, res) => {
  const { token } = req.headers;
  const { id } = jwtHelper.verify(token, process.env.SECRET_KEY);

  const data = await SubscribeModel.findAll({
    where: {
      user_id: id,
    },
  });
  res.send({
    data: data,
  });
};
