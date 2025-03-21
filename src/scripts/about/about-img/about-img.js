import dataImg from "../../../data/data-images-review.json";
console.log(dataImg);

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".image-container");

  if (!container) return;

  const fragment = document.createDocumentFragment();

  // Создаем элементы <li> динамически и добавляем их во фрагмент
  dataImg.images.forEach(({ id, image }) => {
    const li = document.createElement("li");
    li.classList.add("image");

    const img = document.createElement("img");
    img.src = require("../../../assets/images/about-rewiew-img/" + image);
    img.alt = `Image ${id}`;

    li.append(img);
    fragment.append(li);
  });

  container.append(fragment);

  // Дублируем только ОТОБРАЖАЕМЫЕ элементы (12 штук) через фрагмент
  const images = Array.from(container.children).slice(0, 12);
  const cloneFragment = document.createDocumentFragment();

  images.forEach((img) => {
    const clone = img.cloneNode(true);
    cloneFragment.append(clone);
  });

  container.append(cloneFragment);

  // Анимация
  let position = 0;
  const speed = 0.5;

  function moveImages() {
    position -= speed;
    if (Math.abs(position) >= container.scrollWidth / 2) {
      position = 0;
    }
    container.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(moveImages);
  }

  moveImages();
});
