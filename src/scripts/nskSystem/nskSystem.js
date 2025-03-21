import "../../styles/styles.css";
import dataNskSystem from "../../data/data-catalog-color/nsk.json";
import { initColorCatalog } from "../universal-function/colorCatalog.js";

console.log(dataNskSystem);

document.querySelector(".colors-total-nskSystem").textContent =
  dataNskSystem.length;

initColorCatalog(dataNskSystem);
