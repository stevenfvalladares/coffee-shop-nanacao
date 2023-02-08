const request = require("supertest");
const server = require("../index");
const jwt = require("jwt-simple");

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

  it("Obteniendo un 404 al intentar eliminar cafe con ID inexistente", async () => {
    const token = jwt.encode({ user_id: 1 }, "secret");
    const id = 5;
    const response = await request(server)
      .delete("/cafes/".concat(id))
      .set("Authorization", token)
      .send();
    const status = response.statusCode;
    expect(status).toBe(404);
  });

  it("Obteniendo un 201 al agregar un nuevo tipo de cafe", async () => {
    const id = 5;
    const item = { id, nombre: "Espresso" };
    const response = await request(server).post("/cafes").send(item);
    const items = response.body;
    const status = response.statusCode;
    expect(status).toBe(201);
    expect(items).toContainEqual(item);
  });
});
