import "../../styles/styles.css";
import "./review/review.js";
import "./about-img/about-img.js";
import "../modal/modal.js";

export function startSlider() {
  // Получаем элементы кнопок и контейнеров
  const leftBtnElement = document.querySelector(".leftBtn");
  const rightBtnElement = document.querySelector(".rightBtn");
  const containerElement = document.querySelector(".slider-review-container");
  const wrapperElement = document.querySelector(".slider-review-wrapper");
  const slideElements = document.querySelectorAll(".container-review-box"); // Все слайды

  // Состояние слайдера для отслеживания текущих параметров
  const state = {
    totalSlides: slideElements.length, // Количество слайдов
    currentIndex: 1, // Индекс текущего слайда (от 1)
    wrapperWidth: null, // Ширина обертки (динамически вычисляется)
  };

  // Инициализация слайдера (установка размеров и начальное смещение)
  function sliderInit() {
    state.wrapperWidth =
      wrapperElement.offsetWidth -
      parseInt(getComputedStyle(wrapperElement).borderWidth) * 2;

    // Учитываем gap между боксами
    const gap = 10;
    const slideWidth = (state.wrapperWidth - gap) / 2;

    slideElements.forEach((box) => {
      box.style.width = `${slideWidth}px`;
    });

    // Учитываем gap при вычислении общей ширины контейнера
    const containerWidth =
      slideWidth * state.totalSlides + gap * (state.totalSlides - 1);
    containerElement.style.width = `${containerWidth}px`;

    setOffset();
    updateSlideButtons();
  }

  sliderInit(); // Вызываем инициализацию при загрузке страницы

  // Устанавливаем смещение контейнера для показа текущего слайда
  function setOffset() {
    const offsetX = -(state.currentIndex - 1) * (state.wrapperWidth / 2 + 5);
    containerElement.style.transform = `translateX(${offsetX}px)`;
  }

  // Обновляем состояние кнопок (активность/неактивность)
  function updateSlideButtons() {
    leftBtnElement.classList.toggle("btn-non-activ", state.currentIndex === 1);
    // Здесь ограничиваем индекс, чтобы последний клик оставался на предпоследнем слайде
    rightBtnElement.classList.toggle(
      "btn-non-activ",
      state.currentIndex === state.totalSlides - 1
    );
  }

  // Обработчик кликов по кнопкам слайдера
  function clickHandler(event) {
    // Если нажата левая кнопка и мы не на первом слайде
    if (event.target === leftBtnElement && state.currentIndex > 1) {
      state.currentIndex -= 1;
    }
    // Если нажата правая кнопка и мы не на предпоследнем слайде
    else if (
      event.target === rightBtnElement &&
      state.currentIndex < state.totalSlides - 1
    ) {
      state.currentIndex += 1;
    }

    setOffset();
    updateSlideButtons();
  }

  // Добавляем обработчик кликов по документу
  document.addEventListener("click", clickHandler);
  // Перезапускаем инициализацию при изменении размеров окна (адаптивность)
  window.addEventListener("resize", sliderInit);
}

startSlider(); // Запуск слайдера при загрузке страницы
