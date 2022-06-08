const router = require("express").Router();
const userRoutes = require("./userRoutes");
const propertyRoutes = require("./propertyRoutes");
const unitRoutes = require("./unitRoutes");

router.use("/", userRoutes);
router.use("/properties", propertyRoutes);
router.use("/units", unitRoutes);

module.exports = router;
