const supertest = require("supertest");

const request = supertest("http://localhost:49189");

test("Servidor na porta 49189", async () => {
  const resposta = await request.get("/");
  expect(resposta.status).toBe(200);
});
