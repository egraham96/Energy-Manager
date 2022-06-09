const router = require("express").Router();
const propertyController = require("../controllers/propertyController");
const verifyToken = require("../middlewares/verifyToken");

router.use(verifyToken);

router.get("/", propertyController.getByUserId);
router.get("/:id", propertyController.getByPropertyId);
router.post("/", propertyController.createProperty);
router.delete("/:id", propertyController.deleteByPropertyId);
/*router.delete(
  "/column/delete/:name",
  propertyController.deleteColumn
);*/
//router.post("/column/new", propertyController.createNewColumn);
//router.put("/:id", propertyController.updateById);

module.exports = router;

