import productsData from "../../data/data-slider-popular-project.json";

console.log("Данные загружены:");
console.log(productsData.products);

// Запускаем слайдер сразу после загрузки данных
startSlider();

function startSlider() {
  const leftBtnElement = document.querySelector(".leftBtn");
  const rightBtnElement = document.querySelector(".rightBtn");
  const containerElement = document.querySelector(".container");
  const wrapperElement = document.querySelector(".wrapper");
  const slideElements = document.querySelectorAll(".box");

  const currentSlideElement = document.querySelector(".current-slide");
  const totalSlidesElement = document.querySelector(".total-slides");

  const state = {
    totalSlides: slideElements.length,
    currentIndex: 1,
    wrapperWidth: wrapperElement.offsetWidth,
    isAnimating: false,
  };

  // Проверка наличия элементов
  if (
    !leftBtnElement ||
    !rightBtnElement ||
    !containerElement ||
    !wrapperElement ||
    !slideElements.length
  ) {
    console.error("Один или несколько элементов не найдены!");
    return;
  }

  // Клонирование слайдов
  function cloneSlides() {
    const firstClone = slideElements[0].cloneNode(true);
    const lastClone = slideElements[slideElements.length - 1].cloneNode(true);

    containerElement.append(firstClone);
    containerElement.insertBefore(lastClone, slideElements[0]);
  }

  // Инициализация слайдера
  function sliderInit() {
    cloneSlides();
    updateSliderWidth();
    updateTextWindow();
    updateCurrentSlide();
  }

  // Обновление ширины слайдов
  function updateSliderWidth() {
    state.wrapperWidth = wrapperElement.offsetWidth;
    const allSlides = document.querySelectorAll(".box");

    allSlides.forEach((slide) => {
      slide.style.width = state.wrapperWidth + "px";
    });

    containerElement.style.width = state.wrapperWidth * allSlides.length + "px";

    setOffset();
  }

  // Установка смещения
  function setOffset() {
    const offsetX = -state.currentIndex * state.wrapperWidth;
    containerElement.style.transform = "translateX(" + offsetX + "px)";
  }

  // Обновление текстового окна
  function updateTextWindow() {
    const titleElement = document.querySelector(".slider-product-title");
    const descriptionElement = document.querySelector(
      ".slider-product-description"
    );
    const featuresListElement = document.querySelector(
      ".product-features-list"
    );
    const sliderFooterBtnAction = document.querySelector(
      ".slider-footer-btn-action"
    );

    let realIndex = state.currentIndex;
    if (realIndex === 0) realIndex = state.totalSlides;
    if (realIndex > state.totalSlides) realIndex = 1;

    const product = productsData.products[realIndex - 1]; // Берём текущий продукт

    if (product) {
      titleElement.textContent = product.title;
      descriptionElement.textContent = product.description;
      sliderFooterBtnAction.href = product.href;
    }

    // Очищаем список перед добавлением новых характеристик
    featuresListElement.textContent = "";

    if (product.features && product.features.length > 0) {
      product.features.forEach(function (feature) {
        // Создаем элемент списка
        const liElement = document.createElement("li");
        liElement.classList.add("product-features-item");

        // Создаем элемент изображения
        const imgElement = document.createElement("img");
        imgElement.classList.add("product-features-item-icon");

        // Устанавливаем путь к иконке из JSON
        imgElement.src = require("../../assets/images/" + feature.icon);
        imgElement.alt = "Свойство краски - " + feature.text;

        // Создаем элемент текста
        const pElement = document.createElement("p");
        pElement.classList.add("product-features-item-text");
        pElement.textContent = feature.text; // Текст из JSON

        // Добавляем изображение и текст в элемент списка
        liElement.append(imgElement, pElement);

        // Добавляем элемент списка в контейнер
        featuresListElement.appendChild(liElement);
      });
    }
  }

  // Обновление текущего слайда
  function updateCurrentSlide() {
    let realIndex = state.currentIndex;
    if (realIndex === 0) realIndex = state.totalSlides;
    if (realIndex > state.totalSlides) realIndex = 1;

    currentSlideElement.textContent = realIndex;
    totalSlidesElement.textContent = state.totalSlides;
  }

  // Обработка кликов
  function clickHandler(direction) {
    if (state.isAnimating) return;
    state.isAnimating = true;

    if (direction === "left") {
      state.currentIndex--;
    } else if (direction === "right") {
      state.currentIndex++;
    }

    setOffset();
    updateTextWindow();
    updateCurrentSlide();
  }

  // Сброс слайдов
  function resetSlider() {
    if (state.currentIndex === 0) {
      containerElement.style.transition = "none";
      state.currentIndex = state.totalSlides;
      setOffset();
      setTimeout(() => {
        containerElement.style.transition = "transform 0.8s ease-in-out";
      });
    }

    if (state.currentIndex > state.totalSlides) {
      containerElement.style.transition = "none";
      state.currentIndex = 1;
      setOffset();
      setTimeout(() => {
        containerElement.style.transition = "transform 0.8s ease-in-out";
      });
    }

    state.isAnimating = false;
  }

  // Обработчики событий
  leftBtnElement.addEventListener("click", () => clickHandler("left"));
  rightBtnElement.addEventListener("click", () => clickHandler("right"));
  containerElement.addEventListener("transitionend", resetSlider);
  window.addEventListener("resize", updateSliderWidth);

  sliderInit();
}
