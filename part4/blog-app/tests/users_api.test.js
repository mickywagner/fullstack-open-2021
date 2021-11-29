const supertest = require("supertest");
const User = require("../models/user");
const app = require("../app");
const helper = require("./test_helper");
const mongoose = require("mongoose");

const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
  await User.insertMany(helper.initialUsers);
});

describe("When the database is initialized with users", () => {
  test("the correct number of users are returned", async () => {
    const usersAtStart = await helper.usersInDb();

    const response = await api
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(response.body).toHaveLength(usersAtStart.length);
  });
});

describe("Adding a user", () => {
  test("succeeds when the data is valid", async () => {
    const usersAtStart = await helper.usersInDb();

    const userToAdd = {
      username: "pikcachu",
      name: "Ash Ketchum",
      password: "testpass12345",
    };

    const response = await api
      .post("/api/users")
      .send(userToAdd)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
  });

  test("fails if username is too short", async () => {
      const usernameShort = {
          username: "a",
          name: "Ash Ketchum",
          password: "testpassword12345"
      }

      const response = await api
        .post("/api/users")
        .send(usernameShort)
        .expect(400)
  });

  test("fails if the password is too short", async () => {
      const passwordShort = {
          username: "pikachu",
          name: "Ash Ketchum",
          password: "a"
      }

      const response = await api
        .post("/api/users")
        .send(passwordShort)
        .expect(400)
  })
});

describe("When attempting to login", () => {
  test("A token is returned when correct credentials are provided", async () => {
    const initUser = helper.initialUsers[0]
  
    const body =  { username: initUser.username, password: "test12345" }

    const response = await api.post('/api/login')
             .send(body)
             .expect("Content-Type", "application/json; charset=utf-8")
             .expect(200)

    expect(response.body.token).toBeDefined()
  })

  test("Expect 401 if incorrect credentials", async () => {
    const body = { username: "badusername", password: "noPass"}

    await api.post('/api/login')
             .send(body)
             .expect(401)
  })
})




afterAll(() => {
  mongoose.connection.close();
});
