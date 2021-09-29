const db = require("./db");

const criar = async (produto) => {
  let newProduto = {
    Codigo: produto.Codigo,
    Descricao: produto.Descricao,
    Preco: produto.Preco,
  };

  newProduto = await db.produto.create(newProduto);
  return newProduto;
};

const atualizar = async (produto) => {
  await db.produto.update(
    { Descricao: produto.Descricao, Preco: produto.Preco },
    {
      where: {
        Codigo: produto.Codigo,
      },
    }
  );
  return encontrar(produto);
};

const encontrar = async (produto) => {
  const produtoExiste = await db.produto.findOne({
    where: { Codigo: produto.Codigo },
  });

  return produtoExiste;
};

module.exports = {
  criar,
  atualizar,
  encontrar,
};
