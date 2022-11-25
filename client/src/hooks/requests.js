import axios from "axios";

const BASE_URL = "http://localhost:8000";

async function httpGetPlanets() {
  // TODO: Once API is ready.
  // Load planets and return as JSON.
  const planets = await (await axios.get(`${BASE_URL}/planets`)).data;
  return planets;
}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.
  const launches = await (await axios.get(`${BASE_URL}/launches`)).data;
  const orderedLaunches = launches.sort(
    (a, b) => a.flightNumber - b.flightNumber
  );
  return orderedLaunches;
}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
  try {
    const result = await axios.post(`${BASE_URL}/launches`, launch);
    return result;
  } catch (error) {
    return {
      status: false,
    };
  }
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.

  try {
    const result = await axios.delete(`${BASE_URL}/launches/${id}`);
    return result;
  } catch (error) {
    return {
      status: false,
    };
  }
}

export { httpGetPlanets, httpGetLaunches, httpSubmitLaunch, httpAbortLaunch };
