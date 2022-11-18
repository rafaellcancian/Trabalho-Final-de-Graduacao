import { bancosRouter } from "./bancos.route";
import { cepRouter } from "./cep.route";
import { cnpjRouter } from "./cnpj.route";
import { dddRouter } from "./ddd.route";
import { feriadosRouter } from "./feriados.route";
import { geoIpRouter } from "./geoIp.route";
import { ibgeRouter } from "./ibge.route";

const routers = [
  cepRouter,
  cnpjRouter,
  dddRouter,
  feriadosRouter,
  bancosRouter,
  ibgeRouter,
  geoIpRouter
];
  
export { routers };
