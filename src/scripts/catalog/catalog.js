import "../../styles/styles.css";
import "./products.js";
import "./filters.js";
import "./app.js";
import "./toggleView.js";

document.addEventListener("DOMContentLoaded", function () {
  const viewButtons = document.querySelectorAll(".view-btn");

  viewButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Убираем активный класс у всех кнопок
      viewButtons.forEach((btn) => btn.classList.remove("active"));
      // Добавляем активный класс только к нажатой кнопке
      this.classList.add("active");
    });
  });
});

