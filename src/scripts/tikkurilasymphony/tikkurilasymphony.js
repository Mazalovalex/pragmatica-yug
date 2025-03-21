import "../../styles/styles.css";
import dataTikkurilaSymphony from "../../data/data-catalog-color/tikkurila_symphony.json";
import { initColorCatalog } from "../universal-function/colorCatalog.js";
console.log(dataTikkurilaSymphony);

document.querySelector(".colors-total-tikkurilaSymphony").textContent =
  dataTikkurilaSymphony.length;

initColorCatalog(dataTikkurilaSymphony);
