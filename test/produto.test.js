const request = require("supertest");
const app = require("../src/app.js");
const db = require("../src/db");

describe("Testes de integração de Produtos", () => {
  beforeEach(async () => {
    await db.produto.destroy({ where: {} });
  });

  afterAll(async () => await db.sequelize.close());

  const payloadRequest = {
    Codigo: "123",
    Descricao: "Primeiro Produto",
    Preco: 23,
  };

  const produtoErrado = {
    Codigo: 123,
    Descricao: "Primeiro Produto",
    Preco: "23dsadas",
  };

  const duplicateProduto = {
    Codigo: "123",
    Descricao: "Segundo Produto",
    Preco: 50,
  };

  test("Deve ser possível criar um novo produto", async () => {
    const res = await request(app).post("/produto").send(payloadRequest);

    expect(res.status).toBe(201);
  });

  test("Não deve ser possível criar um novo produto com payload errado", async () => {
    const res = await request(app).post("/produto").send(produtoErrado);

    expect(res.status).toBe(400);
  });

  test("Deve ser possível atualizar um produto caso já exista", async () => {
    await request(app).post("/produto").send(payloadRequest);
    const res = await request(app).post("/produto").send(duplicateProduto);

    expect(res.status).toBe(200);
    expect(res.body.Descricao).toBe(duplicateProduto.Descricao);
    expect(res.body.Preco).toBe(duplicateProduto.Preco);
  });
});
