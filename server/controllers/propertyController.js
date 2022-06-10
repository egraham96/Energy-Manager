const { Property } = require("../models/");


const getByPropertyId = (req, res) => {
  const id = parseInt(req.params.id);
  Property.findOne(id)
    .populate("units")
    .then((payload) => {
      res.json(payload);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const getByUserId = (req, res) => {
  const id = parseInt(req.params.id);
  Property.findAll({ user: id })
    .populate("units")
    .then((payload) => {
      res.json(payload);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

//Cascade
//How do I delete the Property then refresh the property model to reflect that the units have been deleted?
const deleteByPropertyId = (req, res) => {
  const id = parseInt(req.params.id);
  Property.findOneandDelete(
    { _id: id },
    { $pullAll: { Units: { property: id } } },
    { new: true }
      .then((payload) => {
        res.json(payload);
      })
      .catch((err) => {
        res.status(400).json(err);
      })
  );
};

const createProperty = (req, res) => {
  const data = req.body;
  Property.create(data)
    .then((payload) => {
      res.json(payload);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

module.exports = {
  getByPropertyId,
  getByUserId,
  deleteByPropertyId,
  createProperty,
};
