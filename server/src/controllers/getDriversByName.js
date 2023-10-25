const { Driver } = require("../db");
const { Op } = require("sequelize");

const getDriversByName = async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).send("Debes proporcionar un nombre de driver.");
    }

    const drivers = await Driver.findAll({
      where: {
        name: {
          [Op.iLike]: `${name}%`,
        },
      },
    });

    if (drivers.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron drivers con ese nombre." });
    }

    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = getDriversByName;