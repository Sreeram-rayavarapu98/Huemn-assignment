const request = require("supertest");
const app = require("../server");
const mongoose = require("mongoose");
const Task = require("../models/task");
const User = require("../models/user");
const Organization = require("../models/organization");

let token;

describe("Task Endpoints", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const organization = new Organization({ name: "Test Org" });
    await organization.save();

    const user = new User({
      username: "testuser",
      password: await bcrypt.hash("testpass", 12),
      role: "User",
      organizationId: organization.id,
    });
    await user.save();

    const res = await request(app)
      .post("/graphql")
      .send({
        query: `
          mutation {
            loginUser(username: "testuser", password: "testpass")
          }
        `,
      });
    token = res.body.data.loginUser;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should create a new task", async () => {
    const res = await request(app)
      .post("/graphql")
      .set("Authorization", token)
      .send({
        query: `
          mutation {
            addTask(title: "Test Task", description: "Task description", status: "Pending", dueDate: "2022-12-31", userId: "${user.id}", organizationId: "${organization.id}") {
              title
            }
          }
        `,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.addTask).toHaveProperty("title");
  });

  it("should fetch tasks for the logged-in user", async () => {
    const res = await request(app)
      .post("/graphql")
      .set("Authorization", token)
      .send({
        query: `
          query {
            tasks {
              title
            }
          }
        `,
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.tasks).toBeInstanceOf(Array);
  });
});
