// Функция для создания продукта
export function createProduct(product, template) {
  if (!template) {
    console.error("Шаблон не найден!");
    return null;
  }

  const productElement = template.content.cloneNode(true);
  const productItem = productElement.querySelector(".products-item");

  // Устанавливаем data-атрибуты
  productItem.dataset.workType = product.work_type;
  productItem.dataset.productType = product.product_type;

  // Заполняем содержимое элементов

  // Изображение товара
  const img = productElement.querySelector(".product-item-image");
  img.src = require("../../assets/images/catalog/products/" + product.image);
  img.alt = product.title;

  // Категория продукта
  const category = productElement.querySelector(".product-category");
  category.textContent = product.product_type || "Неизвестная категория";

  // Заголовок продукта
  const title = productElement.querySelector(".product-description-title");
  title.textContent = product.title || "Без названия";

  // Описание продукта
  const description = productElement.querySelector(".product-description-text");
  description.textContent = product.description_small || "Описание отсутствует";

  // Сыылка на продукта
  const linkBtnCatalog = productElement.querySelector(".link-btn-catalog");
  console.log(linkBtnCatalog);

  linkBtnCatalog.href = product.button_link || "#";

  // Расход продукта
  const consumption = productElement.querySelector(".right-text-consumption");
  consumption.textContent = product.details.consumption || "—";

  // Расход продукта
  const size = productElement.querySelector(".right-text-size");
  const sizes = product.details.packaging.sizes || ["—"];
  size.textContent = sizes.join(" | ");

  // Заменяем ссылку на сертификат
  const passportLink = productElement.querySelector(".product-line-passport");
  passportLink.href = require("../../assets/docs/catalog/passports/" +
    product.passport_product);

  // Добавляем анимацию
  requestAnimationFrame(function () {
    productItem.classList.add("product-fade-in");
  });
  return productElement;
}

// Функция для отрисовки продуктов
export function renderProducts(products, productList, template) {
  // Добавляем класс скрытия перед очисткой
  productList.classList.add("hidden");

  setTimeout(function () {
    const fragment = document.createDocumentFragment();

    products.forEach(function (product) {
      const productElement = createProduct(product, template);
      if (productElement) {
        fragment.append(productElement);
      }
    });
    productList.textContent = "";
    productList.append(fragment);

    // Убираем скрытие с задержкой
    setTimeout(() => {
      productList.classList.remove("hidden");
    }, 50);
  }, 200);
}
