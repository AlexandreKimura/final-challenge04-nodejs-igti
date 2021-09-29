const express = require("express");
const app = express();

const { check, validationResult } = require("express-validator");

const consultaCliente = require("./consulta-cliente");
const produto = require("./produto");

app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send("Bootcamp desenvolvedor back end - Tópicos especiais!");
});

app.post(
  "/consulta-credito",

  check("nome", "Nome deve ser informado").notEmpty(),
  check("CPF", "CPF deve ser informado").notEmpty(),
  check("valor", "O valor deve ser um número").notEmpty().isFloat(),
  check("parcelas", "O número de parcelas deve ser um número inteiro")
    .notEmpty()
    .isInt(),

  async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erro: erros.array() });
    }

    try {
      const valores = await consultaCliente.consultar(
        req.body.nome,
        req.body.CPF,
        req.body.valor,
        req.body.parcelas
      );
      res.status(201).json(valores);
    } catch (erro) {
      return res.status(405).json({ erro: erro.message });
    }
  }
);

app.post(
  "/produto",
  check("Codigo", "Código deve ser informado").notEmpty(),
  check("Descricao", "Descrição deve ser informado").notEmpty(),
  check("Preco", "O valor deve ser um número").notEmpty().isFloat().isInt(),

  async (req, res) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ erro: erros.array() });
    }

    try {
      const produtoExiste = await produto.encontrar(req.body);

      if (produtoExiste) {
        const response = await produto.atualizar(req.body);
        return res.status(200).json(response);
      } else {
        const response = await produto.criar(req.body);
        return res.status(201).json(response);
      }
    } catch (erro) {
      return res.status(405).json({ erro: erro.message });
    }
  }
);

module.exports = app;
