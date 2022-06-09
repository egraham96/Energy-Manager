const router = require("express").Router();
const unitController = require("../controllers/unitController");
const verifyToken = require("../middlewares/verifyToken");

router.use(verifyToken);

router.get("/:id", unitController.getAllUnitsByPropertyId);
//router.get("/data/type", unitController.getDataType);
router.post("/", unitController.createUnit);
//router.post("/column/new", checkRole, unitController.createNewColumn);
//router.put("/:id", checkRole, unitController.updateById);
router.delete("/:id", unitController.deleteByUnitId);
router.delete("/all/:id", unitController.deleteAllUnitsByPropertyId);
//router.delete("/column/delete/:name", checkRole, unitController.deleteColumn);

module.exports = router;
