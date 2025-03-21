import reviews from "../../../data/data-review.json";
import { startSlider } from "../about.js";

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("reviews-container"); // Убедитесь, что это id вашего контейнера
  if (container) {
    const fragment = document.createDocumentFragment(); // создаем фрагмент для оптимизации

    reviews.reviews.forEach((review) => {
      // Создание контейнера для отзыва
      const reviewBox = document.createElement("div");
      reviewBox.classList.add("container-review-box");
      reviewBox.id = review.id; // добавляем id отзыва

      // Создание текста отзыва
      const text = document.createElement("p");
      text.classList.add("text");
      text.textContent = review.text;

      // Создание футера отзыва
      const footer = document.createElement("div");
      footer.classList.add("container-footer");

      // Создание автора отзыва
      const author = document.createElement("span");
      author.classList.add("review-autor");
      author.textContent = review.author;

      // Создание ссылки на оригинал письма
      const link = document.createElement("a");
      link.classList.add("review-link", "link-hover");
      // link.href = review.original_link || "#"; // если ссылки нет, то ставим заглушку
      link.textContent = "Посмотреть оригинал письма";

      // Добавление автора и ссылки в футер
      footer.append(author, link);

      // Добавление текста и футера в контейнер отзыва
      reviewBox.append(text, footer);

      // Добавление контейнера отзыва в фрагмент
      fragment.append(reviewBox);
    });

    // Добавление фрагмента в основной контейнер
    container.append(fragment);

    // Теперь, когда все отзывы добавлены, запускаем слайдер
    startSlider(); // вызов функции слайдера
  }
});
