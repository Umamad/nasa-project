const launches = new Map();

let currentFlightNumber = 100;
const launch = {
  flightNumber: 100,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

launches.set(launch.flightNumber, launch);

function existsWithId(id) {
  return launches.has(id);
}

function getAllLaunches() {
  return Array.from(launches.values());
}

function addNewLaunch(launch) {
  currentFlightNumber++;
  
  launches.set(
    currentFlightNumber,
    Object.assign(launch, {
      flightNumber: currentFlightNumber,
      customer: ["ZTM", "NASA"],
      upcoming: true,
      success: true,
    })
  );
}

function abortLaunchById(LaunchId) {
  const aborted = launches.get(LaunchId);
  aborted.upcoming = false;
  aborted.success = false;
  return aborted;
}

module.exports = {
  launches,
  getAllLaunches,
  addNewLaunch,
  existsWithId,
  abortLaunchById,
};
