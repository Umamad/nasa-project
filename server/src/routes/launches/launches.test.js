const request = require("supertest");

const app = require("../../app");
const { connectMongo, disconnectMongo } = require("../../services/mongo");

describe("Test launches api", () => {
  beforeAll(async () => await connectMongo());
  afterAll(async () => await disconnectMongo())

  describe("Test Get /launches", () => {
    test("should respond with status 200 success", async () => {
      const response = await request(app)
        .get("/v1/launches")
        .expect("Content-Type", /json/)
        .expect(200);

      // expect(response.statusCode).toBe(200);
    });
  });

  describe("Test Post /launches", () => {
    const completeLaunchData = {
      mission: "USS Enterprise",
      rocket: "NCC 1701-D",
      target: "Kepler-296 A e",
      launchDate: "January 4, 2028",
    };

    const launchDataWithoutDate = {
      mission: "USS Enterprise",
      rocket: "NCC 1701-D",
      target: "Kepler-296 A e",
    };

    test("should respond with status 201 created", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(completeLaunchData)
        .expect("Content-Type", /json/)
        .expect(201);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(responseDate).toBe(requestDate);

      expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test("It should catch missing required properties", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithoutDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Missing required launch property",
      });
    });

    //   test("It should catch invalid dates", () => {});
  });
});
