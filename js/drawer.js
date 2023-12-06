const openBtn = document.querySelector(".header__menu");
const closeBtn = document.querySelector(".drawer__btn--exit");
const drawer = document.querySelector(".drawer");
const drawerLinks = document.querySelectorAll(".drawer__item")
const sidebarLinks = document.querySelectorAll(".sidebar__item")

openBtn.addEventListener("click", () => {
  drawer.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  drawer.classList.remove("active");
});

let prevDrawerItem;

drawerLinks.forEach((el) => {
  el.addEventListener('click', () => {
    if (prevDrawerItem) {
      prevDrawerItem.classList.remove("drawer__item--active")
    } 
    el.classList.add("drawer__item--active")
    prevDrawerItem = el
  })
})

let prewSidebarItem;

sidebarLinks.forEach((el) => {
  el.addEventListener('click', () => {
    if (prewSidebarItem) {
      prewSidebarItem.classList.remove("sidebar__item--active")
    } 
    el.classList.add("sidebar__item--active")
    prewSidebarItem = el
  })
})


const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  slidesPerView: 1.2,
  spaceBetween: 20,
  loop: true,

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

