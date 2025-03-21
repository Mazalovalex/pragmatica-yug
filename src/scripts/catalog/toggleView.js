function toggleView(viewType) {
  const productsList = document.querySelector(".products-list");

  // Упрощаем условие
  productsList.classList.toggle("list-view", viewType === "list");
}

// Находим кнопки один раз
const gridViewBtn = document.querySelector(".grid-view-btn");
const listViewBtn = document.querySelector(".list-view-btn");

// Добавляем обработчики событий
gridViewBtn.addEventListener("click", function () {
  toggleView("grid");
});
listViewBtn.addEventListener("click", function () {
  toggleView("list");
});
