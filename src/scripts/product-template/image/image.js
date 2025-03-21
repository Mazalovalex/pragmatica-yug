import productsData from "../../../data/products.json";

// Функция для получения пути изображения
function getImagePath(productIndex) {
  const productName = productsData.products[productIndex].name;
  return `./${productName}/${productName}.webp`;
}

// Функция для получения пути изображения эмблемы
function getEmblemaPath(productIndex) {
  const productName = productsData.products[productIndex].name;
  return `./${productName}/${productName}_emblema.webp`;
}

// Проверяем наличие элемента .thumbnail-container
const thumbnailContainer = document.querySelector(".thumbnail-container");

if (thumbnailContainer) {
  const thumbnails = thumbnailContainer.querySelectorAll(".thumbnail");

  // Устанавливаем большое изображение
  const fullsizeImage = document.querySelector(".fullsize-image");
  if (fullsizeImage) {
    const currentIndex = thumbnails[0]
      ? thumbnails[0].dataset.currentIndex
      : undefined; // Берем currentIndex из первой миниатюры
    if (currentIndex !== undefined) {
      const imagePath = getImagePath(currentIndex); // Путь для большого изображения
      const imagesContext = require.context(
        "../../../assets/images/product-template",
        true,
        /\.(webp|png|jpg|jpeg|svg)$/
      );
      fullsizeImage.src = imagesContext(imagePath); // Устанавливаем источник большого изображения
    } else {
      console.error("currentIndex не найден или некорректен.");
    }
  }

  // Устанавливаем миниатюры и добавляем обработчик клика
  thumbnails.forEach(function (thumbnail) {
    const currentIndex = thumbnail.dataset.currentIndex;

    if (currentIndex !== undefined) {
      let imagePath;

      // Определяем, является ли изображение эмблемой
      if (thumbnail.classList.contains("thumbnail1")) {
        imagePath = getEmblemaPath(currentIndex);
      } else {
        imagePath = getImagePath(currentIndex);
      }

      // Используем require.context для динамической загрузки изображений
      const imagesContext = require.context(
        "../../../assets/images/product-template",
        true,
        /\.(webp|png|jpg|jpeg|svg)$/
      );

      thumbnail.src = imagesContext(imagePath); // Устанавливаем источник миниатюры

      // Добавляем обработчик клика на миниатюру
      thumbnail.addEventListener("click", function () {
        if (fullsizeImage) {
          fullsizeImage.src = thumbnail.src; // Устанавливаем источник большого изображения равным источнику миниатюры
        }
      });
    } else {
      console.error("currentIndex не найден или некорректен.");
    }
  });
} else {
  console.error("Элемент с классом 'thumbnail-container' не найден");
}
