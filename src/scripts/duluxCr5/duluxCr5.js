import "../../styles/styles.css";
import dataDuluxCr5 from "../../data/data-catalog-color/dulux_CP5.json";
import { initColorCatalog } from "../universal-function/colorCatalog.js";

document.querySelector(".colors-total-duluxCR5").textContent =
  dataDuluxCr5.length;

initColorCatalog(dataDuluxCr5);

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".description-catalog__item").forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const colorClass = item.dataset.color; // Берем data-color (например, "bg", "gg")
      if (colorClass) {
        const targetPath = document.querySelector(
          `.description-catalog__svg-image .${colorClass}`
        );
        if (targetPath) {
          targetPath.style.opacity = "0.5";
        } else {
          console.warn(`Path с классом ${colorClass} не найден!`);
        }
      }
    });

    item.addEventListener("mouseleave", () => {
      const colorClass = item.dataset.color;
      if (colorClass) {
        const targetPath = document.querySelector(
          `.description-catalog__svg-image .${colorClass}`
        );
        if (targetPath) {
          targetPath.style.opacity = "1";
        }
      }
    });
  });
});
