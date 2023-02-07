const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
  it("Obteniendo un 200", async () => {
    const response = await request(server).get("/cafes").send();
    const status = response.statusCode;
    expect(status).toBe(200);
  });

  it("El tipo de dato obtenido es un arreglo con un objeto", async () => {
    const { body } = await request(server).get("/cafes/1").send();
    const arrayObject = body;
    expect(arrayObject).toBeInstanceOf(Object);
  });
});
