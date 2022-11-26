const {
  getAllLaunches,
  addNewLaunch,
  existsWithId,
  abortLaunchById,
} = require("../../models/launches/launches.model");

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (!launch.mission || !launch.rocket || !launch.target || !launch.launchDate)
    return res.status(400).json({
      error: "Missing required launch property",
    });

  launch.launchDate = new Date(launch.launchDate);
  addNewLaunch(launch);
  return res.status(201).json(launch);
}

function httpAbortLaunch(req, res) {
  const launchId = req.param.id;

  if (!existsWithId(launchId))
    return res.status(404).json({
      message: "not found!",
    });

  const aborted = abortLaunchById(launchId);
  console.log(aborted);
  return res.status(200).json(aborted);
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
