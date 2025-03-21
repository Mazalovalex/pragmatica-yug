import productsData from "../../data/products.json"; // Импорт данных
import { renderProducts } from "./products.js";
import {
  addFilterEventListeners,
  filterProducts,
  addClearFilterEventListener,
  applyFiltersFromUrl, // Импортируем новую функцию
} from "./filters.js";

// Отладочные сообщения
console.log("Данные продуктов:", productsData);

// Получаем шаблон и контейнер
const template = document.querySelector(".product-template");
const productList = document.querySelector(".products-list");

// Элементы для фильтрации
const workTypeFilters = document.querySelectorAll('input[name="work-type"]');
const productTypeFilters = document.querySelectorAll(
  'input[name="product-type"]'
);
const packagingFilters = document.querySelectorAll('input[name="packaging"]');

// Кнопка сброса фильтров
const clearButton = document.querySelector(".clear-all");

// Применяем фильтры из URL при загрузке страницы
applyFiltersFromUrl(
  productsData,
  workTypeFilters,
  productTypeFilters,
  packagingFilters,
  (filteredProducts) => {
    renderProducts(filteredProducts, productList, template);
  }
);

// Добавляем обработчики событий для фильтров
addFilterEventListeners(
  workTypeFilters,
  productTypeFilters,
  packagingFilters,
  filterProducts,
  productsData,
  (filteredProducts) => {
    renderProducts(filteredProducts, productList, template);
  }
);

// Добавляем обработчик для кнопки "сбросить"
addClearFilterEventListener(
  clearButton,
  workTypeFilters,
  productTypeFilters,
  packagingFilters,
  renderProducts,
  productsData,
  productList,
  template
);
