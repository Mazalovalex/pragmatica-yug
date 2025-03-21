import "../../styles/styles.css";
import dataRal from "../../data/data-catalog-color/ral_classic.json";
import { initColorCatalog } from "../universal-function/colorCatalog.js";

document.querySelector(".colors-total-ral-classic").textContent =
  dataRal.length;

initColorCatalog(dataRal);
