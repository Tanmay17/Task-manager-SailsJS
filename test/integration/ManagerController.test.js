const supertest = require("supertest")("http://localhost:1337");
const mockData = require('../mockData').ManagerController;

describe("Testing ManagerController", () => {
    it("getAllTask: No params send 500 status code", async () => {
        await supertest
            .get("/task/getAllTask")
            .expect(500);
    });

    it("getAllTask: Invalid params send 400 status code", async () => {
        await supertest
            .get("/task/getAllTask")
            .query(mockData.getAllTask.Invalid)
            .expect(400);
    });

    it("getAllTask: Company added with valid params", async () => {
        await supertest
            .get("/task/getAllTask")
            .query(mockData.getAllTask.Valid)
            .expect(200);
    });

    it("createTask: No params send 500 status code", async () => {
        await supertest
            .post("/task/createTask")
            .expect(500);
    });

    it("createTask: Invalid params send 400 status code", async () => {
        await supertest
            .post("/task/createTask")
            .send(mockData.createTask.Invalid)
            .expect(400);
    });

    it("createTask: Company added with valid params", async () => {
        await supertest
            .post("/task/createTask")
            .send(mockData.createTask.Valid)
            .expect(200);

        await Task.destroy({
            created_by: "t@test.com"
        });
    });

    it("assignTask: No params send 500 status code", async () => {
        await supertest
            .post("/task/assignTask")
            .expect(500);
    });

    it("assignTask: Invalid params send 400 status code", async () => {
        await supertest
            .post("/task/assignTask")
            .send(mockData.assignTask.Invalid)
            .expect(400);
    });

    it("assignTask: Company added with valid params", async () => {
        await Task.create(mockData.createTask.Valid);
        let a = mockData.assignTask.Valid;
        let data = await Task.find({
            deadline: 1561684
        })
        a['id'] = data[0].id
        await supertest
            .post("/task/assignTask")
            .send(a)
            .expect(200);

        await Task.destroy({
            id: a.id
        });
    });
});