import partnersData from "../../data/data-partners.json";

function createPartnersList(data) {
  // Находим элемент списка
  const partnersListElement = document.querySelector(".partners-list");

  // Проверяем, существует ли элемент списка
  if (!partnersListElement) {
    console.error("Элемент .partners-list не найден!");
    return;
  }

  // Проверяем, есть ли данные
  if (!data || !data.partners || !data.partners.length) {
    console.error("Нет данных о партнёрах!");
    return;
  }

  // Создаем DocumentFragment для оптимизации
  const fragment = document.createDocumentFragment();

  // Функция для создания элемента партнёра
  function createPartnerItem(partner) {
    const listItem = document.createElement("li");
    listItem.classList.add("partners-item");

    // Проверка на наличие изображения
    if (partner.image) {
      const imgElement = document.createElement("img");
      imgElement.src = require("../../assets/images/partnersIcon/" +
        partner.image); // Динамическое формирование пути к изображению
      imgElement.alt = partner.name;
      imgElement.classList.add("partner-logo");
      listItem.append(imgElement);
    }

    // Добавляем имя партнёра (скрытое)
    if (partner.name) {
      const partnerName = document.createElement("span");
      partnerName.textContent = partner.name;
      partnerName.classList.add("partner-name");
      listItem.append(partnerName);
    }

    return listItem; // Возвращаем готовый элемент
  }

  // Проходим по всем партнёрам и добавляем их в список
  data.partners.forEach((partner) => {
    const partnerItem = createPartnerItem(partner);
    fragment.append(partnerItem);
  });

  // Добавляем все элементы в DOM за одну операцию
  partnersListElement.append(fragment);
}

// Вызываем функцию для создания списка партнёров
createPartnersList(partnersData);
