const supertest = require("supertest")("http://localhost:80");
const assert = require('chai').assert;
var expect = require('chai').expect;
var sinon = require('sinon');
const mockData = require('../mockData').AgentController;

describe("Testing AgentController", () => {
    it("No params send 500 status code", async () => {
        await supertest
            .get("/task/getAllTask")
            .expect(500);
    });

    it("Invalid params send 400 status code", async () => {
        await supertest
            .post("/company/add")
            .set("authorization", `bearer ${global.token}`)
            .send(mockData.addCompany.Invalid)
            .expect(400);
    });

    it("Company added with valid params", async () => {

        
    });
});