// Функция фильтрации
export function filterProducts(
  productsData,
  workTypeFilters,
  productTypeFilters,
  packagingFilters,
  renderProducts
) {
  console.log("Фильтрация запущена!");

  // Получаем выбранные фильтры
  const selectedWorkTypes = Array.from(workTypeFilters)
    .filter((input) => input.checked)
    .map((input) => input.value);

  const selectedProductTypes = Array.from(productTypeFilters)
    .filter((input) => input.checked)
    .map((input) => input.value);

  const selectedPackaging = Array.from(packagingFilters)
    .filter((input) => input.checked)
    .map((input) => input.value);

  console.log("Выбранные типы работы:", selectedWorkTypes);
  console.log("Выбранные типы продукта:", selectedProductTypes);
  console.log("Выбранная фасовка:", selectedPackaging);

  const filteredProducts = productsData.products.filter((product) => {
    let matchesWorkType = true;
    let matchesProductType = true;
    let matchesPackaging = true;

    // Проверяем соответствие выбранным типам работы (учитываем массив и строку)
    if (selectedWorkTypes.length) {
      if (Array.isArray(product.work_type)) {
        matchesWorkType = product.work_type.some((type) =>
          selectedWorkTypes.includes(type)
        );
      } else {
        matchesWorkType = selectedWorkTypes.includes(product.work_type);
      }
    }

    // Проверяем соответствие выбранным типам продукта
    if (selectedProductTypes.length) {
      matchesProductType = selectedProductTypes.includes(product.product_type);
    }

    // Проверяем соответствие выбранной фасовке
    if (selectedPackaging.length) {
      matchesPackaging = selectedPackaging.some((size) => {
        const packaging = product.details.packaging || {};
        const sizes = packaging.sizes || [];
        return sizes.includes(size);
      });
    }

    return matchesWorkType && matchesProductType && matchesPackaging;
  });

  console.log("Отфильтрованные продукты:", filteredProducts);
  renderProducts(filteredProducts);
}

// Функция для сброса фильтров
export function clearFilters(
  workTypeFilters,
  productTypeFilters,
  packagingFilters,
  renderProducts,
  productsData,
  productList,
  template
) {
  workTypeFilters.forEach((filter) => (filter.checked = false));
  productTypeFilters.forEach((filter) => (filter.checked = false));
  packagingFilters.forEach((filter) => (filter.checked = false));

  console.log("Фильтры сброшены");

  // Отрисовываем все продукты при сбросе фильтров
  renderProducts(productsData.products, productList, template);
}

// Обработчики изменений для фильтров
export function addFilterEventListeners(
  workTypeFilters,
  productTypeFilters,
  packagingFilters,
  filterProducts,
  productsData,
  renderProducts
) {
  workTypeFilters.forEach((filter) =>
    filter.addEventListener("change", () =>
      filterProducts(
        productsData,
        workTypeFilters,
        productTypeFilters,
        packagingFilters,
        renderProducts
      )
    )
  );
  productTypeFilters.forEach((filter) =>
    filter.addEventListener("change", () =>
      filterProducts(
        productsData,
        workTypeFilters,
        productTypeFilters,
        packagingFilters,
        renderProducts
      )
    )
  );
  packagingFilters.forEach((filter) =>
    filter.addEventListener("change", () =>
      filterProducts(
        productsData,
        workTypeFilters,
        productTypeFilters,
        packagingFilters,
        renderProducts
      )
    )
  );
}

// Добавление обработчика события на ссылку "сбросить"
export function addClearFilterEventListener(
  clearButton,
  workTypeFilters,
  productTypeFilters,
  packagingFilters,
  renderProducts,
  productsData,
  productList,
  template
) {
  clearButton.addEventListener("click", () => {
    // Сбрасываем фильтры
    clearFilters(
      workTypeFilters,
      productTypeFilters,
      packagingFilters,
      renderProducts,
      productsData,
      productList,
      template
    );
  });
}

// Функция для применения фильтров из URL
export function applyFiltersFromUrl(
  productsData,
  workTypeFilters,
  productTypeFilters,
  packagingFilters,
  renderProducts
) {
  const urlParams = new URLSearchParams(window.location.search);
  const productType = urlParams.get("product_type");

  if (productType) {
    // Находим соответствующий чекбокс и отмечаем его
    const checkbox = Array.from(productTypeFilters).find(
      (input) => input.value === productType
    );
    if (checkbox) {
      checkbox.checked = true;
    }

    // Применяем фильтры
    filterProducts(
      productsData,
      workTypeFilters,
      productTypeFilters,
      packagingFilters,
      renderProducts
    );
  } else {
    // Если параметров нет, отображаем все продукты
    renderProducts(productsData.products);
  }
}
