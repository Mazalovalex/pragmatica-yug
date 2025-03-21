import "../../styles/styles.css";
import dataTekcexterior from "../../data/data-catalog-color/tekcexterior.json";
import { initColorCatalog } from "../universal-function/colorCatalog.js";
console.log(dataTekcexterior);

document.querySelector(".colors-total-tekcexterior").textContent =
  dataTekcexterior.length;

initColorCatalog(dataTekcexterior);