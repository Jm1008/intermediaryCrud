const knex = require("../../database/index");

module.exports = {
  async raiz(req, res) {
    try {
      return res.send("Resposta do servidor raiz");
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  async searchComprasAll(req, res) {
    try {
      const { codcomp } = req.body;
      const { codcli } = req.body;
      const resultCli = await knex("clientes").where("codcli", "=", codcli);
      const { nome } = resultCli[0];
      const { email } = resultCli[0];

      const { codpro } = req.body;
      const resultPro = await knex("produtos").where("codpro", "=", codpro);
      const { descri } = resultPro[0];
      const { qtda } = req.body;
      const { preco } = req.body;
      const total = qtda * preco;

      data = {
        codcomp,
        codcli,
        nome,
        email,
        codpro,
        descri,
        qtda,
        preco,
        total,
      };

      return res.json(data);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  async searchComprasCod(req, res) {
    try {
      const { cod } = req.params;
      const result = await knex("compras").where("codcomp", "=", cod);
      return res.json(result);
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  },
  async createCompras(req, res) {
    try {
      //chave para desestruturar o json
      const { codcli } = req.body;
      if (codcli == "") {
        return res.status(400).json({ msg: "Cliente não cadastrado" });
      } else {
        const resultCli = await knex("clientes").where("codcli", "=", codcli);
        if (resultCli == "") {
          return res.status(400).json({ msg: "Cliente não cadastrado" });
        }
      }

      const { codpro } = req.body;
      if (codpro == "") {
        const resultPro = await knex("produtos").where("codpro", "=", codpro);
        if (resultPro == "") {
          return res.status(400).json({ msg: "Produto não cadastrado" });
        }
      }
      const { qtda } = req.body;
      const { preco } = req.body;
      await knex("compras").insert({
        codcli,
        codpro,
        qtda,
        preco,
      });
      return res.status(201).send({ msg: "foi mermo mermão" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  async updateCompras() {
    try {
      const { cod: codcomp } = req.params;
      const { codcli } = req.body;
      const { codpro } = req.body;
      const { qtda } = req.body;
      const { preco } = req.body;
      await knex("compras")
        .update({
          codcomp,
          codcli,
          codpro,
          qtda,
          preco,
        })
        .where({ codcomp });
      return res.status(201).send({ msg: "Registro Alterado" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  async deleteCompras(req, res) {
    try {
      const { cod: codcomp } = req.params;
      await knex("compras").where({ codcomp }).del();
      return res.status(201).send({ msg: "Registro deletado" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
};
