const http = require("http");

const app = require("./app");
const { connectMongo } = require("./services/mongo");
const { loadPlanetsData } = require("./models/planets/planets.model");

//? Definitions
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServerWithAfterDataLoad() {
  await connectMongo();

  // Load planets data
  await loadPlanetsData();

  // Start server
  server.listen(PORT, () => console.log(`Listening on port ${PORT} ...`));
}

startServerWithAfterDataLoad();
