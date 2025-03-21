document.body.addEventListener("click", function (e) {
  if (e.target.tagName === "BUTTON" && e.target.classList.contains("tab")) {
    const tabs = document.querySelectorAll(".tab");
    const tabIndex = Array.from(tabs).indexOf(e.target);

    const contents = document.querySelectorAll(".tab-content");

    //Работа с таб
    tabs.forEach(function (tab) {
      tab.classList.remove("active-tab");
    });

    e.target.classList.add("active-tab");

    //Работа с контентом
    contents.forEach(function (content) {
      content.classList.remove("activeContent");
    });

    contents[tabIndex].classList.add("activeContent");
  }
});
