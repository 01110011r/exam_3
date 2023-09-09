import { GroupModel } from "../moduls/group.modul.js";
import { jwtHelper } from "../utils/jwtoken.js";
import "dotenv/config";



export const createGroup = async (req, res) => {
  try {
    const { groupname } = req.body;
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
        msg: "faqat user group create qilishi mumkin! :(",
      });

    if (!groupname)
      return res.send({
        msg: "groupname yo'q!",
      });

    const g_name = await GroupModel.findOne({
      where: { groupname: groupname },
    });
 
    if (g_name)
      return res.send({
        msg: "groupname band!  :(",
      });

    const data = await GroupModel.create({
      groupname,
      owner_id: id,
      avatar: avatarka,
    });

    res.status(201).json({
      status: 201,
      data,
    });
  } catch (error) {
    console.log("group controller --->" + error.message);
    res.send({
      error: error.message,
    });
  }
};

export const groupDelete = async (req, res) => {
  try {
    const { g_id } = req.params;
    const { token } = req.headers;
    const { id } = jwtHelper.verify(token, process.env.SECRET_KEY);

    if (!id)
      return res.send({
        msg: "sizda grouplar yo'q, faqat user group create qilishi mumkin! :(",
      });

    const group = await GroupModel.findOne({ where: { g_id: g_id } });

    if (!group || group.owner_id != id)
      return res.send({
        msg: "guruhni faqat egasi o'chirishi mumkin! :(",
      });

    const data = await GroupModel.destroy({
      where: {
        g_id: g_id,
      },
    });

    res.json({
      data: data == 1 ? "delete" : data,
    });
  } catch (error) {
    console.log("group controller --->" + error.message);
    res.send({
      error: error.message,
    });
  }
};

export const groupGet = async (req, res) => {
  try {
    const { token } = req.headers;
    const { id } = jwtHelper.verify(token, process.env.SECRET_KEY);

    if (!id)
      return res.send({
        msg: "siz user emassiz, guruh create qilolmaysiz!  :(",
      });

    const data = await GroupModel.findAll({ where: { owner_id: id } });

    res.send({
      data,
    });
  } catch (error) {
    console.log(error.message);
    res.send({
      error: error.message,
    });
  }
};

export const groupGetAll = async (req, res) => {
  try {
    const data = await GroupModel.findAll();

    res.send({ data });
  } catch (error) {
    console.log(error.message);
    res.send({
      error: error.message,
    });
  }
};

export const updateGroup = async (req, res) => {
  try {
    const { g_id } = req.params;
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
        msg: "sizda grouplar yo'q, faqat user group create qilishi mumkin! :(",
      });

    const group = await GroupModel.findOne({ where: { g_id: g_id } });

    if (!group || group.owner_id != id)
      return res.send({
        msg: "sizda bunday guruh yo'q! :(",
      });


    const data = await GroupModel.update(newData, { where: { g_id: g_id } });

    res.json({
      protcess_code: data[0],
      newData,
    });
  } catch (error) {
    console.log("group controller --->" + error.message);
    res.send({
      error: error.message,
    });
  }
};
