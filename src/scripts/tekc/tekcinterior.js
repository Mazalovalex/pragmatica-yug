import "../../styles/styles.css";
import dataTekcinterior from "../../data/data-catalog-color/tekcInterior.json";
import { initColorCatalog } from "../universal-function/colorCatalog.js";
console.log(dataTekcinterior);

document.querySelector(".colors-total-tekcinterior").textContent =
  dataTekcinterior.length;

initColorCatalog(dataTekcinterior);
