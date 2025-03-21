import "../../styles/styles.css";

// Находим элементы
const openPopupBtn = document.querySelector(".review-link"); // Кнопка открытия
const closePopupBtn = document.querySelector(".close-popup-btn"); // Кнопка закрытия
const popup = document.querySelector(".popup"); // Сам попап
console.log(openPopupBtn);

// Функция открытия попапа
function openPopup() {
  popup.classList.add("popup_is-opened");
}

// Функция закрытия попапа
function closePopup() {
  popup.classList.remove("popup_is-opened");
}

// Вешаем обработчик на документ (или ближайший статический контейнер)
document.addEventListener("click", (event) => {
  // Проверяем, был ли клик на кнопке с классом .review-link
  if (event.target.classList.contains("review-link")) {
    openPopup();
  }
});

closePopupBtn.addEventListener("click", closePopup); // Закрыть по клику

// Закрытие попапа по клику вне его области
popup.addEventListener("click", (event) => {
  if (event.target === popup) {
    // Если клик был на фоне (не на контенте)
    closePopup();
  }
});
