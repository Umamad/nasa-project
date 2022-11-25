const http = require("http");
const cluster = require("cluster");
const os = require("os");

const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;
const NUMBER_WORKERS = os.cpus().length;

const server = http.createServer(app);

async function startServerWithAfterDataLoad() {
  // Load planets data
  await loadPlanetsData();

  if (cluster.isMaster) {
    console.log("Master started");

    // Create workors
    for (let i = 0; i < NUMBER_WORKERS; i++) {
      cluster.fork();
    }
  } else {
    // Start server
    server.listen(PORT, () => console.log(`Listening on port ${PORT} ...`));
  }
}

startServerWithAfterDataLoad();
