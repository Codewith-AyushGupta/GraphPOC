//@get Contact By ID
//@Type Get
//@Scope Public
const GraphPoints = require("../models/GraphPoints");

const asyncHandler = require("express-async-handler");

const getGraphPoints = asyncHandler(async (req, res) => {
  console.log("in Get getGraphPoints");
  const graphPoints = await GraphPoints.find();
  res.status(200).json({
    data: graphPoints,
  });
});

module.exports={getGraphPoints};