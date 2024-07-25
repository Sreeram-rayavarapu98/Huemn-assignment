const request = require("supertest");
const app = require("../server"); // Assuming you export the app from server.js
const mongoose = require("mongoose");
const User = require("../models/user");

describe("User Endpoints", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should create a new user", async () => {
    const res = await request(app)
      .post("/graphql")
      .send({
        query: `
          mutation {
            addUser(username: "testuser", password: "testpass", role: "Admin", organizationId: "60f5a0f8c2b8f2a567c3a3e5") {
              username
            }
          }
        `,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.addUser).toHaveProperty("username");
  });

  it("should log in a user", async () => {
    const res = await request(app)
      .post("/graphql")
      .send({
        query: `
          mutation {
                loginUser(username: "testuser", password: "testpass")
          }
        `,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.loginUser).toBeTruthy();
  });
});
