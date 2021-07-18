const request = require("supertest");
const app = require("../src/app");
const User = require("../src/models/user");
const { userOneId, userOne, setupDatabase } = require("./fixtures/db.js");

beforeEach(setupDatabase);

test("Should signup a new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Jacob",
      email: "jacob@example.com",
      password: "Mypass11111",
    })
    .expect(201);

  // Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  // Assertion about response
  expect(response.body).toMatchObject({
    user: {
      name: "Jacob",
      email: "jacob@example.com",
    },
    token: user.tokens[0].token,
  });
  expect(user.password).not.toBe("Mypass11111");
});

test("Should log in existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  const user = await User.findById(response.body.user._id);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test("Should not log in non-existent user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: "bademail@example.com",
      password: "notmypass",
    })
    .expect(400);
});

test("Should get profile for user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("Should not get pofile for unauthorized user", async () => {
  await request(app).get("/users/me").send().expect(401);
});

test("Should delete profile for user", async () => {
  const response = await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(userOne._id);
  expect(user).toBeNull();
});

test("Should not delete unauthorized user", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

test("Should upload avatar image", async () => {
  await request(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/profile-pic.jpg")
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("Should update valid user fields", async () => {
  const response = await request(app)
    .patch("/users/me")
    .set("Authorization", `${userOne.tokens[0].token}`)
    .send({ name: "Mike" })
    .expect(200);

  const user = await User.findById(userOne._id);
  expect(user.name).toEqual("Mike");
});

test("Should not update invalid user fields", async () => {
  const response = await request(app)
    .patch("/users/me")
    .set("Authorization", `${userOne.tokens[0].token}`)
    .send({ lastName: "Mike" })
    .expect(400);
});
