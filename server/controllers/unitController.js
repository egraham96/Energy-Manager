const Property  = require('../models/Property');
const Unit = require('../models/Unit');

const getAllUnitsByPropertyId = (req, res) => {
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

const createUnit = (req, res) => {
  const data = req.body;
  Unit.create(data)
    .then((payload) => {
      res.json(payload);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const deleteAllUnitsByPropertyId = (req, res) => {
  const id = parseInt(req.params.id);
  Unit.deleteMany({ property:id })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};


const deleteByUnitId = (req, res) => {
  const id = parseInt(req.params.id);
  Unit.findOneandDelete({ id})
    //.populate("units")
    .then((payload) => {
      res.json(payload);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};



module.exports = {
  getAllUnitsByPropertyId,
  createUnit,
  deleteAllUnitsByPropertyId,
  //updateByUnitId
  deleteByUnitId
};
