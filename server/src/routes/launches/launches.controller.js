const {
  getAllLaunches,
  existsWithId,
  abortLaunchById,
  scheduleNewLaunch,
} = require("../../models/launches/launches.model");

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (!launch.mission || !launch.rocket || !launch.target || !launch.launchDate)
    return res.status(400).json({
      error: "Missing required launch property",
    });

  launch.launchDate = new Date(launch.launchDate);
  await scheduleNewLaunch(launch);
  return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
  const launchId = req.params.id;

  const launchExists = await existsWithId(launchId);
  if (!launchExists)
    return res.status(404).json({
      message: "not found!",
    });

  const aborted = await abortLaunchById(launchId);
  if (!aborted)
    return res.status(400).json({
      error: "Aborting failed!",
    });

  return res.status(200).json({
    ok: true,
  });
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
