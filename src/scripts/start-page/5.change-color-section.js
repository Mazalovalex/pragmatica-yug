import changeColorData from "../../data/data-change-color.json";

document.addEventListener("DOMContentLoaded", function () {
  const changeColorList = document.querySelector(".change-color-list");

  if (!changeColorList) {
    console.error("Элемент .change-color-list не найден!");
    return;
  }

  if (
    !changeColorData ||
    !changeColorData.catalogs ||
    !changeColorData.catalogs.length
  ) {
    console.error("Нет данных о цветовых каталогах!");
    return;
  }

  // Создаём фрагмент
  const fragment = document.createDocumentFragment();

  // Функция для создания заголовка и описания каталога
  function createHeader(catalog) {
    const header = document.createElement("div");
    header.classList.add("catalog-header");

    // Заголовок
    const title = document.createElement("h2");
    title.classList.add("catalog-header-title");
    title.textContent = catalog.name;

    // Описание
    const description = document.createElement("p");
    description.textContent = catalog.description;
    description.classList.add("catalog-description"); // Добавляем класс для стилей

    // Добавляем заголовок и описание за один раз
    header.append(title, description);

    return header;
  }

  // Функция для создания кнопки
  function createButton(buttonlink) {
    const link = document.createElement("a");
    link.classList.add("transition-all", "change-color-button");
    link.setAttribute("aria-label", "Оставить заявку");

    link.textContent = "Весь каталог";
    link.href = buttonlink; // Используем переданный buttonlink

    return link;
  }

  // Функция для создания списка цветов
  function createColorList(colors) {
    const colorList = document.createElement("ul");
    colorList.classList.add("color-list");

    colors.forEach((color) => {
      const colorItem = document.createElement("li");
      colorItem.classList.add("color-item");
      colorItem.style.backgroundColor = color.hex;
      colorItem.textContent = color.name;
      colorList.append(colorItem);
    });

    return colorList;
  }

  // Функция для добавления и удаления класса "expanded" при наведении
  function handleColorItemsExpansion(event, action) {
    const catalogItem = event.currentTarget;
    const colorItems = catalogItem.querySelectorAll(".color-item");

    colorItems.forEach((item, index) => {
      setTimeout(() => {
        if (action === "add") {
          item.classList.add("expanded");
        } else if (action === "remove") {
          item.classList.remove("expanded");
        }
      }, index * 100);
    });
  }

  // Функция для создания одного элемента каталога
  function createCatalogItem(catalog) {
    const catalogItem = document.createElement("li");
    catalogItem.classList.add("change-color-item");

    // Создаём и добавляем заголовок и описание
    const header = createHeader(catalog);

    // Создаём контейнер для цветов и кнопки
    const colorContainer = document.createElement("div");
    colorContainer.classList.add("color-container");

    // Создаём и добавляем список цветов и кнопку
    const colorList = createColorList(catalog.colors);
    const button = createButton(catalog.buttonlink); // Передаём buttonlink

    // Добавляем все элементы в colorContainer за один раз
    colorContainer.append(colorList, button);

    // Добавляем заголовок и контейнер в catalogItem
    catalogItem.append(header, colorContainer);

    // Анимация при наведении
    catalogItem.addEventListener("mouseenter", function (event) {
      handleColorItemsExpansion(event, "add");
    });

    catalogItem.addEventListener("mouseleave", function (event) {
      handleColorItemsExpansion(event, "remove");
    });

    // Обработчик клика на весь блок
    catalogItem.addEventListener("click", function () {
      window.location.href = catalog.buttonlink; // Переход по ссылке
    });

    return catalogItem;
  }

  // Проходим по всем каталогам и добавляем их в фрагмент
  changeColorData.catalogs.forEach((catalog) => {
    const catalogItem = createCatalogItem(catalog);
    fragment.appendChild(catalogItem);
  });

  // Добавляем фрагмент в DOM
  changeColorList.append(fragment);
});
