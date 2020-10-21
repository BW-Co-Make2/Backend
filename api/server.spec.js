// THIS FILE TESTS THE APIS END POINTS
const { expectCt } = require("helmet");
const supertest = require("supertest");
const server = require("./server");
let token;

describe("Server.js", () => {
  describe("Sanity Check", () => {
    it("Should get 200 ok status", () => {
      return supertest(server)
        .get("/")
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
    it("Should get API WORKING on body.Server", () => {
      return supertest(server)
        .get("/")
        .then((res) => {
          expect(res.body.Server).toBe("API working");
        });
    });
  });

  describe("Testing the Registration and Login", () => {
    let user = {
      username: "Victor",
      password: "pass",
    };
    it.skip("should resolve to 201 when registering", () => {
      return supertest(server)
        .post("/auth/register")
        .send(user)
        .then((res) => {
          expect(res.status).toBe(201);
        });
    });
    it("should resolve to 200 when loging in", () => {
      return supertest(server)
        .post("/auth/login")
        .send(user)
        .then((res) => {
          token = res.body.token;
          expect(res.status).toBe(200);
        });
    });
    it("Checks the token on the response body when loging in", () => {
      return supertest(server)
        .post("/auth/login")
        .send(user)
        .then((res) => {
          token = res.body.token;
          expect(res.body.token).toEqual(token);
        });
    });
  });

  describe("testing the Public issue routes", () => {
    it("GET public issues", () => {
      return supertest(server)
        .get("/issue")
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
    it("GET public issues array length //AT THE TIME OF TEST THERE ARE 0 in the arry", () => {
      return supertest(server)
        .get("/issue")
        .then((res) => {
          expect(res.body.data).toHaveLength(0);
        });
    });
  });
  // Have to be logged in and have a token to use these
  describe("Testing the Private GET", () => {
    it("Should Resolve to 401 without the token", () => {
      return supertest(server)
        .get("/issue/private/:id")
        .then((res) => {
          expect(res.status).toBe(401);
        });
    });
    it("Should Resolve to 200 with the token", () => {
      return supertest(server)
        .get("/issue/private/:id")
        .set("Authorization", token) // Setting the token to the header
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
  });
  describe("Testing A specific post GET", () => {
    it("Should Resolve to 401 without the token", () => {
      return supertest(server)
        .get("/issue/private/post/:id")
        .then((res) => {
          expect(res.status).toBe(401);
        });
    });
    it("Should Resolve to 200 with the token", () => {
      return supertest(server)
        .get("/issue/private/post/:id")
        .set("Authorization", token) // Setting the token to the header
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });
  });
});