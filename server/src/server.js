const http = require("http");
const mongoose = require("mongoose");

const app = require("./app");
const { loadPlanetsData } = require("./models/planets/planets.model");

//? Definitions
const PORT = process.env.PORT || 8000;
const CONNECTION_STRING = `mongodb+srv://nasa-api:S65549y4oeYFBegp@nasacluster.wbwcsju.mongodb.net/nasa?retryWrites=true&w=majority`;

const server = http.createServer(app);

//? Data base events
mongoose.connection.once("open", () => console.log("Connected to DB!"));
mongoose.connection.on("error", (error) => console.error(error));

async function startServerWithAfterDataLoad() {
  await mongoose.connect(CONNECTION_STRING);

  // Load planets data
  await loadPlanetsData();

  // Start server
  server.listen(PORT, () => console.log(`Listening on port ${PORT} ...`));
}

startServerWithAfterDataLoad();
