const http = require("http");

const app = require("./app");
const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServerWithAfterDataLoad() {
    // Load planets data
    await loadPlanetsData();

    // Start server
    server.listen(PORT, () => console.log(`Listening on port ${PORT} ...`));
}

startServerWithAfterDataLoad();