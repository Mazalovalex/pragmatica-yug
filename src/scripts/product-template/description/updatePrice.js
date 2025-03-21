const updatePrice = () => {
  const selectedRadio = document.querySelector(
    'input[name="product-size"]:checked'
  );
  const packageCount = parseInt(
    document.getElementById("package-count").textContent,
    10
  );

  if (selectedRadio) {
    const selectedPrice = selectedRadio.getAttribute("data-price");
    const totalPrice = parseFloat(selectedPrice) * packageCount;
    document.getElementById("selected-price").textContent =
      formatPrice(totalPrice);
  }
};

const formatPrice = (price) => {
  return price.toLocaleString("ru-RU", { minimumFractionDigits: 0 });
};

document.addEventListener("DOMContentLoaded", updatePrice);

document.querySelectorAll('input[name="product-size"]').forEach((radio) => {
  radio.addEventListener("change", updatePrice);
});

document.getElementById("increment").addEventListener("click", () => {
  const countElement = document.getElementById("package-count");
  let count = parseInt(countElement.textContent, 10);
  countElement.textContent = count + 1;
  updatePrice();
});

document.getElementById("decrement").addEventListener("click", () => {
  const countElement = document.getElementById("package-count");
  let count = parseInt(countElement.textContent, 10);
  if (count > 1) {
    countElement.textContent = count - 1;
    updatePrice();
  }
});
