const primaryNavigation = document.querySelector("#primary-navigation");
const menuBtn = document.querySelector("#menu-btn");

const toggleMenu = () => {
    primaryNavigation.dataset.opened = primaryNavigation.dataset.opened === "true" ? "false":"true";
    menuBtn.setAttribute("aria-expanded", "true")
}

menuBtn.addEventListener("click", toggleMenu)