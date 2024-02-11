import Carousel from "/carousel.js"

const body = document.querySelector("body");
const desktopBreakpoint = window.matchMedia("(min-width: 940px)");
const mainCarouselElement = document.querySelector(".product-preview");
const lightBoxCarouselElement = mainCarouselElement.cloneNode(true); 
const lightBoxCloseBtn = lightBoxCarouselElement.querySelector("#close-lightbox-btn");
const closeLightbox = () => {
    body.removeChild(lightBoxCarouselElement);
}

const mainCarousel = new Carousel(mainCarouselElement);
lightBoxCarouselElement.classList.add("product-preview--lightbox");


lightBoxCarouselElement.addEventListener("click", (e) => {
    if (e.target.matches(".product-preview") || e.target.matches("#close-lightbox-btn")) {
        closeLightbox();
    }
})

mainCarouselElement.querySelector(".product-carousel").addEventListener("click", () => {
    if (!desktopBreakpoint.matches) {
        return;
    }

    body.insertAdjacentElement("afterbegin", lightBoxCarouselElement);
    const lightboxCarousel = new Carousel(lightBoxCarouselElement);
})


