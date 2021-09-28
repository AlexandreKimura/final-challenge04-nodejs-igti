const supertest = require("supertest");

const request = supertest("http://localhost:49223");

test("Servidor na porta 49223", async () => {
  const resposta = await request.get("/");
  expect(resposta.status).toBe(200);
});
