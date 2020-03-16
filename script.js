// Navigation
const navMenu = document.querySelector(".menu_items");
console.log(navMenu);
navMenu.addEventListener("click", e => {
  if (e.target.className === "menu_item") {
    const elements = document.querySelectorAll(".menu_item");
    elements.forEach(e => {
      e.classList.remove("menu_item_active");
    });
    e.target.classList.add("menu_item_active");
  }
});
