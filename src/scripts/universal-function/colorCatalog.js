// Функция для вычисления контрастного цвета текста
function getContrastColor(rgb) {
  // Вычисляем яркость цвета по формуле относительной светлоты (luminance)
  const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;
  // Если цвет светлый, возвращаем черный текст, иначе — белый
  return luminance > 0.5 ? "#000000" : "#ffffff";
}

// Функция для создания цветового блока
function createColorBox(color) {
  const colorBox = document.createElement("div");
  colorBox.classList.add("color-box");
  colorBox.style.backgroundColor = color.hex;
  colorBox.style.color = getContrastColor(color.rgb); // Подбираем контрастный цвет для текста
  colorBox.textContent = color.id;
  return colorBox;
}

// Функция для создания списка с деталями цвета
function createColorDetails(color) {
  const colorDetails = document.createElement("ul");
  colorDetails.classList.add("color-details");

  // Создаём массив с параметрами цвета
  const colorDetailItems = [
    { label: "Цвет", value: color.id || "Не указано" },
    { label: "Коллекция", value: color.catalog || "Не указано" },
    { label: "Цветовая категория", value: color.category || "Не указано" },
  ];

  // Проходим по массиву параметров и создаем элементы списка
  colorDetailItems.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.classList.add("color-detail-item");
    listItem.textContent = item.label + ": ";

    const valueSpan = document.createElement("span");
    valueSpan.classList.add("color-code");
    valueSpan.textContent = item.value;

    listItem.append(valueSpan);
    colorDetails.append(listItem);
  });

  return colorDetails;
}

// Функция для создания превью цветовой линии с деталями
function createcolorPreview(color) {
  const colorPreview = document.createElement("div");
  colorPreview.classList.add("red-line");
  colorPreview.style.backgroundColor = color.hex;
  colorPreview.style.color = getContrastColor(color.rgb);

  // Добавляем детали цвета
  const colorDetails = createColorDetails(color);
  colorPreview.append(colorDetails);

  // Добавляем примечание о возможных различиях в цветопередаче
  const colorNote = document.createElement("p");
  colorNote.classList.add("color-note");
  colorNote.textContent =
    "*Цветовые оттенки и категории на сайте могут отличаться... (длинный текст)";
  colorPreview.append(colorNote);

  return colorPreview;
}

// Функция для создания блока с изображением и кнопкой
function createImageAndButtonBlock() {
  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container-color-collection");

  // Добавляем изображение
  const image = document.createElement("img");
  image.src = require("../../assets/images/ralClassic/1.webp"); // Фиксированное изображение
  image.alt = "Logo";
  imageContainer.append(image);

  // Добавляем контейнер для кнопки
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");

  // Создаём ссылку-кнопку для перехода в каталог
  const link = document.createElement("a");
  link.classList.add("button", "transition-all");
  link.setAttribute("aria-label", "Перейти в каталог");
  link.textContent = "Перейти в каталог";
  link.href = "/catalog.html"; // Фиксированная ссылка

  // Добавляем стрелку к кнопке
  const buttonArrow = document.createElement("span");
  buttonArrow.classList.add("button-arrow");

  link.append(buttonArrow);
  buttonContainer.append(link);
  imageContainer.append(buttonContainer);

  return imageContainer;
}

// Функция для отображения цветов
function displayColors(colors, colorGrid) {
  colorGrid.textContent = ""; // Очищаем контейнер перед отрисовкой
  let lastClickedElement = null;
  let colorPreviewContainer = null;

  const fragment = document.createDocumentFragment(); // Используем фрагмент для улучшения производительности
  const imageAndButtonBlock = createImageAndButtonBlock(); // Создаём блок с изображением и кнопкой один раз

  colors.forEach((color, index) => {
    const colorBox = createColorBox(color);

    // Добавляем обработчик события для клика
    colorBox.addEventListener("click", () => {
      if (lastClickedElement === colorBox) {
        // Если повторный клик — скрываем превью
        if (colorPreviewContainer) {
          colorPreviewContainer.remove();
          colorPreviewContainer = null;
        }
        lastClickedElement = null;
      } else {
        // Убираем предыдущее превью, если оно есть
        if (colorPreviewContainer) {
          colorPreviewContainer.remove();
        }

        // Создаём контейнер для превью и добавляем туда детали цвета
        colorPreviewContainer = document.createElement("div");
        colorPreviewContainer.classList.add("red-line-container");

        const colorPreview = createcolorPreview(color);
        colorPreviewContainer.append(
          colorPreview,
          imageAndButtonBlock.cloneNode(true) // Дублируем блок с изображением и кнопкой
        );

        // Определяем позицию превью в ряду (по 8 элементов в ряду)
        const rowNumber = Math.floor(index / 8);
        const rowEndIndex = (rowNumber + 1) * 8;

        // Вставляем превью в конец ряда или в конец списка
        if (rowEndIndex < colorGrid.children.length) {
          colorGrid.insertBefore(
            colorPreviewContainer,
            colorGrid.children[rowEndIndex]
          );
        } else {
          colorGrid.append(colorPreviewContainer);
        }

        lastClickedElement = colorBox;
      }
    });

    // Добавляем каждый созданный блок с цветом в фрагмент
    fragment.append(colorBox);
  });

  // Добавляем фрагмент с цветами в цветовую сетку
  colorGrid.append(fragment);
}

// Функция фильтрации цветов по категории и названию
function applyFilters(colors) {
  const category = document
    .getElementById("categoryFilter")
    .value.toLowerCase();
  const searchQuery = document
    .getElementById("searchFilter")
    .value.toLowerCase();

  // Фильтруем цвета по категории и названию
  return colors.filter(
    (color) =>
      (!category || color.category.toLowerCase() === category) &&
      (!searchQuery || color.id.toLowerCase().includes(searchQuery))
  );
}

// Функция инициализации каталога цветов
export function initColorCatalog(data) {
  const colorGrid = document.getElementById("colorGrid");

  // Проверка данных перед инициализацией
  if (!data || !Array.isArray(data)) {
    console.error(
      "Ошибка: данные не загружены или имеют неправильную структуру."
    );
    return;
  }

  // Отображаем все цвета при загрузке
  displayColors(data, colorGrid);

  // Добавляем обработчики событий для фильтров
  ["categoryFilter", "searchFilter"].forEach((filterId) => {
    document.getElementById(filterId).addEventListener("input", () => {
      displayColors(applyFilters(data), colorGrid);
    });
  });

  // Кнопка сброса фильтров
  document.getElementById("resetFilters").addEventListener("click", () => {
    document.getElementById("searchFilter").value = "";
    document.getElementById("categoryFilter").value = "";
    displayColors(data, colorGrid); // Показываем все цвета после сброса
  });
}
