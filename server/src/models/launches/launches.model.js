const launches = require("./lanches.mongo");
const planets = require("../planets/planets.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;

async function saveLaunch(launch) {
  const targetPlanet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!targetPlanet) throw new Error("There is no such a planet!");

  await launches.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

async function getLatestFlightNumber() {
  const latestFlight = await launches.findOne().sort("-flightNumber");
  if (!latestFlight) return DEFAULT_FLIGHT_NUMBER;
  return latestFlight.flightNumber;
}

async function getAllLaunches() {
  return await launches.find({}, ["-_id", "-__v"]);
}

async function scheduleNewLaunch(launch) {
  const flightNumber = (await getLatestFlightNumber()) + 1;

  const newLaunch = Object.assign(launch, {
    flightNumber,
    customer: ["ZTM", "NASA"],
    upcoming: true,
    success: true,
  });

  await saveLaunch(newLaunch);
}

async function existsWithId(id) {
  return await launches.findOne({
    flightNumber: id,
  });
}

async function abortLaunchById(launchId) {
  const aborted = await launches.updateOne(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    }
  );

  return aborted.matchedCount === 1 && aborted.modifiedCount === 1;
}

module.exports = {
  launches,
  getAllLaunches,
  scheduleNewLaunch,
  existsWithId,
  abortLaunchById,
};
