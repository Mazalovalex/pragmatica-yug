import "../../styles/styles.css";
import "./slider-popular-product.js";
import "./partner-section.js";
import "./5.change-color-section.js";

window.addEventListener("load", () => {
  const preloaderSection = document.getElementById("preloader-section");
  const firstContentBlock = document.querySelector(
    "header, section, main, footer"
  );
  const progressBar = document.querySelector(".progress-bar");
  const progressText = document.querySelector(".progress-text");
  const logo = document.querySelector(".logo_big_opaciti");

  if (
    preloaderSection &&
    firstContentBlock &&
    progressBar &&
    progressText &&
    logo
  ) {
    let progress = 0;
    const duration = 2000; // 2 секунды гарантированной загрузки
    const intervalTime = duration / 100; // Интервал обновления в мс

    // Показываем логотип (он не мешает остальной анимации)
    setTimeout(() => {
      logo.style.opacity = "1";
    }, 300); // 0.3 сек задержки перед появлением логотипа

    // Анимация прогресс-бара
    const interval = setInterval(() => {
      progress += 1;
      progressBar.style.width = `${progress}%`;
      progressText.textContent = `${progress}%`;

      if (progress >= 100) {
        clearInterval(interval);

        // Ждем 0.5 сек, затем плавно скрываем прелоадер
        setTimeout(() => {
          preloaderSection.style.opacity = "0";
          preloaderSection.style.pointerEvents = "none"; // Отключаем взаимодействие с прелоадером

          // После исчезновения (0.5 сек) убираем прелоадер
          setTimeout(() => {
            preloaderSection.style.display = "none";
            firstContentBlock.style.display = "block";

            // Убираем прелоадер из потока документа
            preloaderSection.remove();
          }, 500);
        }, 500);
      }
    }, intervalTime);
  } else {
    console.error("Ошибка: не найдены элементы прелоадера!");
  }
});


window.addEventListener("load", () => {
  const logo = document.querySelector(".logo_big_opaciti");

  if (logo) {
    setTimeout(() => {
      logo.style.opacity = "1"; // Плавно проявляем
    }, 300); // 0.5 сек задержки перед началом появления
  }
});
