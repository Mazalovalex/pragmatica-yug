import "../../styles/styles.css";

import dataDuluxCr5 from "../../data/data-catalog-color/dulux_CP5.json";
import dataRal from "../../data/data-catalog-color/ral_classic.json";
import dataNskSystem from "../../data/data-catalog-color/nsk.json";
import dataTikkurilaSymphony from "../../data/data-catalog-color/tikkurila_symphony.json";
import dataTekcexterior from "../../data/data-catalog-color/tekcexterior.json";
import dataTekcinterior from "../../data/data-catalog-color/tekcInterior.json";

document.querySelector(".colors-total-duluxCR5").textContent =
  dataDuluxCr5.length;

document.querySelector(".colors-total-ralClassic").textContent = dataRal.length;

document.querySelector(".colors-total-nskSystem").textContent =
  dataNskSystem.length;

document.querySelector(".colors-total-tikkurilaSymphony").textContent =
  dataTikkurilaSymphony.length;

document.querySelector(".colors-total-tekcinterior").textContent =
  dataTekcinterior.length;

document.querySelector(".colors-total-tekcexterior").textContent =
  dataTekcexterior.length;
