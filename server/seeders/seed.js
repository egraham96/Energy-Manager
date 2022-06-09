const db = require('../config/db')
const { User, Property, /*Unit*/}  = require('../models');
//const unitData = require('./unitData.json');
const propertyData = require('./propertyData.json');
const userData=require('./userData.json')
require('dotenv').config();

console.log("hello")

db.once('open', async () => {
  // clean database
  await User.deleteMany({});
  //await Unit.deleteMany({});
  await Property.deleteMany({});
  console.log("hello")


  const properties= await Property.create(propertyData);
  //const units = await Unit.create(unitData);
  const users = await User.create(userData);
  console.log(properties)
  console.log(users)

  console.log('Data is seeded!');
  process.exit(0);
});



