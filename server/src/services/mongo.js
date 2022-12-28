const mongoose = require("mongoose");

const CONNECTION_STRING = `mongodb+srv://nasa-api:S65549y4oeYFBegp@nasacluster.wbwcsju.mongodb.net/nasa?retryWrites=true&w=majority`;

//? Data base events
mongoose.connection.once("open", () => console.log("Connected to DB!"));
mongoose.connection.on("error", (error) => console.error(error));

async function connectMongo() {
  await mongoose.connect(CONNECTION_STRING);
}

async function disconnectMongo() {
  await mongoose.connect(CONNECTION_STRING);
}

module.exports = { connectMongo, disconnectMongo };
