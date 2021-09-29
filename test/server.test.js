const supertest = require("supertest");

const request = supertest("http://localhost:49153");

test("Servidor na porta 49153", async () => {
  const resposta = await request.get("/");
  expect(resposta.status).toBe(200);
});
