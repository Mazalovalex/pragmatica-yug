import "../../styles/styles.css";
import "./image/image.js";
import "./tabs/tabs.js";
import "./description/updatePrice.js";

import productsData from "../../data/products.json"; // Импорт данных

const productLink = document.querySelector(".product-link-download");
console.log(productLink);

// Извлекаем значение атрибута data-current-index
const dataCurrentIndex = productLink.getAttribute("data-current-index");
console.log(dataCurrentIndex); // Выведет значение атрибута, например: 0

console.log();

const passport_product =
  productsData.products[dataCurrentIndex].passport_product;
productLink.href = require("../../assets/docs/catalog/passports/" +
  passport_product);
