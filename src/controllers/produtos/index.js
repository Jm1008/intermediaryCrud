const knex = require('../../database/index');

module.exports = {
    async raiz(req, res) {
        try {
            return res.send('Resposta do servidor raiz');
        } catch (error) {
            return res.status(400).json({error : error.message})
        };
    },
    
    async searchProdsAll(req, res) {
        try {
            const result = await knex('produtos')
            return res.json(result)
        } catch (error) {
            return res.status(400).json({error : error.message})
        };
    },

    async searchProdsCod(req, res) {
        try {
            const { cod } = req.params;
            const result = await knex('produtos')
                .where('codpro', '=', cod);
            return res.json(result);
        } catch (error) {
            return res.status(400).send({error : error.message})
        };
    },

    async searchProdsNome(req, res) {
        try {
            const { nome } = req.params;
            console.log(nome);
            const result = await knex('produtos')
                .where('nome', 'like', '%' + nome + '%');
            return res.json(result);
        } catch (error) {
            return res.status(400).send({error : error.message})
        };
    },

    async createProd(req, res) {
        try {
            const { nome } = req.body;
            const { descri } = req.body;
            const { qtda } = req.body;
            const { preco } = req.body;
            const { custo } = req.body;
            await knex('produtos').insert({
                nome,
                descri,
                qtda,
                preco,
                custo
            });
            return res.status(201).send({msg: 'produto cadastrado'});
        } catch (error) {
            return res.status(400).json({error : error.message})
        };

    },

    async updateProd(req, res) {
        try {
            const { cod:codpro } = req.params;
            const { nome } = req.body;
            const { descri } = req.body;
            const { qtda } = req.body;
            const { preco } = req.body;
            const { custo } = req.body;

            await knex('produtos').update({
                codpro,
                nome,
                descri,
                qtda,
                preco,
                custo
            }).where({ codpro });
            return res.status(201).send({msg: 'Registro Alterado'});
        } catch (error) {
            return res.status(400).json({error : error.message})
        };
    },
    async deleteProd(req, res) {
        try {
            const { cod:codpro } = req.params;
            await knex('produtos')
                .where({ codpro }).del();
            return res.status(201).send({msg: 'Registro deletado'});
        } catch (error) {
            return res.status(400).json({error : error.message})
        }
    }
}