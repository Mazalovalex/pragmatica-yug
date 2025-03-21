import "../../styles/styles.css";

// JavaScript для динамического изменения подкатегорий
const categorySelects = document.querySelectorAll(
  ".form-select[name='category']"
);
const subcategorySteps = document.querySelectorAll(".subcategory-step");
const subcategorySelects = document.querySelectorAll(
  ".form-select[name='subcategory']"
);

const subcategories = {
  paints: ["Для фасадов", "Для интерьеров", "Для промышленных объектов"],
  decorative: ["Фактурные покрытия", "Декоративная штукатурка"],
  primer: ["Для внутренних работ", "Для внешних работ"],
  partnership: ["Дистрибуция", "Франшиза", "Другое"],
  distribution: ["Оптовые закупки", "Региональное партнерство"],
  consultation: [
    "Рекомендация по продукту",
    "Подбор цвета",
    "Вопрос по колеровке",
  ],
  quality: ["Вопросы по качеству", "Жалобы или замечания"],
  other: ["Иные вопросы или предложения"],
};

// Перебираем все элементы с классом .form-select[name='category']
categorySelects.forEach(function (categorySelect, index) {
  categorySelect.addEventListener("change", function (event) {
    const selectedCategory = event.target.value; // Используем event.target
    const subcategoryStep = subcategorySteps[index];
    const subcategorySelect = subcategorySelects[index];

    if (selectedCategory && subcategories[selectedCategory]) {
      // Показываем блок с подкатегориями
      subcategoryStep.style.display = "block";

      // Очищаем предыдущие опции с помощью textContent
      subcategorySelect.innerHTML = ""; // Очищаем все дочерние элементы

      // Добавляем новые опции
      subcategories[selectedCategory].forEach(function (optionText) {
        const option = document.createElement("option");
        option.value = optionText;
        option.textContent = optionText; // Используем textContent для установки текста
        subcategorySelect.appendChild(option);
      });
    } else {
      // Скрываем блок с подкатегориями, если категория не выбрана или нет подкатегорий
      subcategoryStep.style.display = "none";
    }
  });
});
