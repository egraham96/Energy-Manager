const Property = require("../models/Property");
const Unit = require("../models/Unit");

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

//How do I create a new unit then refresh the property model to reflect that a new Unit has been added
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

//How do I delete all the units then refresh the property model to reflect that the units have been deleted?
const deleteAllUnitsByPropertyId = (req, res) => {
  const id = parseInt(req.params.id);
  //const toDelete = Unit.find({ property: id });
  Unit.deleteMany(
    { property: id }
      /*{ $pullAll: { Property: {units: {[toDelete]} }}*/
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.status(400).json(err);
      })
  );
};

//How do I delete the unit then refresh the property model to delete that Unit from array of Units
const deleteByUnitId = (req, res) => {
  const id = parseInt(req.params.id);
  Unit.findOneAndDelete(
    { property: id },
    { $pullAll: { Property: { units: { _id: id } } } }
      .then((payload) => {
        res.json(payload);
      })
      .catch((err) => {
        res.status(400).json(err);
      })
  );
};

//How do I update the unit?
/*const updateUnitById = (req, res) => {
  const id = parseInt(req.params.id);}*/

module.exports = {
  getAllUnitsByPropertyId,
  createUnit,
  deleteAllUnitsByPropertyId,
  //updateUnitById,
  deleteByUnitId,
};
