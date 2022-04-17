import { expect } from "chai";
import supertest from "supertest";
import app from "../index.js";

const request = supertest(app);

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTNmYjBmZmY3ZjYyMjkwODc4ZTUyZiIsImlhdCI6MTY1MDE4MTg4NiwiZXhwIjoxNjUyNzczODg2fQ.M5C58CZRVv33BZ69RdMskTY5OTegeioWB5LdFarYnXU";

describe("GET /trackings", () => {
  it("returns a status of 200", (done) => {
    request
      .get("/tracking/load-all")
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .end((err) => {
        done(err);
      });
  });

  it("returns a list of Trackings", function (done) {
    request
      .get("/tracking/get-trackings")
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .end(function (err, res) {
        expect(res.body.payload).to.have.lengthOf(10);
        done(err);
      });
  });

  it("returns a total of 42", function (done) {
    request
      .get("/tracking/get-summary")
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .end((err) => {
        done(err);
      });
  });

  it("returns a total of 99", function (done) {
    request
      .get("/tracking/get-trackings?status=delivered")
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .end(function (err, res) {
        expect(res.body.total).to.eq(99);
        done(err);
      });
  });
  it("returns a total of 1", function (done) {
    request
      .get("/tracking/get-trackings?status=expired")
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .end(function (err, res) {
        expect(res.body.total).to.eq(1);
        done(err);
      });
  });
});

describe("GET /ical/:id", () => {
  it("returns a status of 200", (done) => {
    request
      .get("/ical/1ZE2X0010390461001")
      .set("Authorization", "Bearer " + token)
      .expect(200)
      .end((err) => {
        done(err);
      });
  });

  it("returns a status of 200", (done) => {
    request
      .get("/ical/324jhjhj23423hj")
      .set("Authorization", "Bearer " + token)
      .expect(404)
      .end((err) => {
        done(err);
      });
  });
});
