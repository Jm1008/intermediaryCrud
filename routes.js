const express = require("express");

const controllersProds = require("./src/controllers/produtos/index");
const controllersClient = require("./src/controllers/cliente/index");
const controllersCompras = require("./src/controllers/compras");
const routes = express.Router();

// produtos
routes.get("/", controllersProds.raiz);
routes.get("/produtos", controllersProds.searchProdsAll);
routes.get("/produtos/cod/:cod", controllersProds.searchProdsCod);
routes.get("/produtos/nome/:nome", controllersProds.searchProdsNome);

routes.post("/produtos", controllersProds.createProd);
routes.put("/produtos/cod/:cod", controllersProds.updateProd);
routes.delete("/produtos/cod/:cod", controllersProds.deleteProd);
////////////////////////////////

// compras
routes.get("/", controllersCompras.raiz);
routes.get("/compras", controllersCompras.searchComprasAll);

routes.post("/compras", controllersCompras.createCompras);
routes.put("/compras/cod/:cod", controllersCompras.updateCompras);
routes.delete("/compras/cod/:cod", controllersCompras.deleteCompras);

////////////////////////////////

// clientes

routes.get("/", controllersClient.raiz);
routes.get("/clientes", controllersClient.searchClientAll);
routes.get("/clientes/cod/:cod", controllersClient.searchClientCod);
routes.get("/clientes/nome/:nome", controllersClient.searchClientNome);

routes.post("/clientes", controllersClient.createClient);
routes.put("/clientes/cod/:cod", controllersClient.updateClient);
routes.delete("/clientes/cod/:cod", controllersClient.deleteClient);

module.exports = routes;
