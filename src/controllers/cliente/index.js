const knex = require("../../database/index");

module.exports = {
  async raiz(req, res) {
    try {
      return res.send("Resposta do servidor raiz");
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async searchClientAll(req, res) {
    try {
      const result = await knex("clientes");
      return res.json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async searchClientCod(req, res) {
    try {
      const { cod } = req.params;
      const result = await knex("clientes").where("codcli", "=", cod);
      return res.json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async searchClientNome(req, res) {
    try {
      const { nome } = req.params;
      console.log(nome);
      const result = await knex("clientes").where(
        "nome",
        "like",
        "%" + nome + "%"
      );
      return res.json(result);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async createClient(req, res) {
    try {
      const { nome } = req.body;
      const { email } = req.body;
      const { uf } = req.body;
      const { clientescol } = req.body;

      const result = await knex("clientes").where({ email });
      if (result.length === 1) {
        return res.status(400).send({ error: "Usuário já cadastrado" });
      }

      await knex("clientes").insert({
        nome,
        email,
        uf,
        clientescol
      });
      
      return res.status(201).send({ msg: "Cliente cadastrado" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async updateClient(req, res) {
    try {
      const { cod: codcli } = req.params;
      const { nome } = req.body;
      const { email } = req.body;
      const senha = await bcrypt.hash(req.body.senha, 10);
      const { uf } = req.body;

      await knex("clientes")
        .update({
          codcli,
          nome,
          email,
          senha,
          uf
        })
        .where({ codcli });
      return res.status(201).send({ msg: "Registro Alterado" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
  async deleteClient(req, res) {
    try {
      const { cod: codcli } = req.params;
      await knex("clientes").where({ codcli }).del();
      return res.status(201).send({ msg: "Registro deletado" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },
};
