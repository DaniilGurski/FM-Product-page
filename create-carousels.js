import Carousel from "/carousel.js"

const desktopBreakpoint = window.matchMedia("(min-width: 940px)");

const body = document.querySelector("body");
const productPreviewTemplate = document.querySelector(".product-preview-template").content;

const mainCarouselElement = body.querySelector(".product-preview");
const largePreview = mainCarouselElement.querySelector(".product-carousel");
const mainCarouselClass = new Carousel(mainCarouselElement);

const closeLightbox = (e) => {
    const lightbox = e.currentTarget;
    const closeBtn = lightbox.querySelector("#close-lightbox-btn");

    if (e.target.matches(".product-preview") || e.target.parentElement === closeBtn) {
        lightbox.remove();
    }
}

largePreview.addEventListener("click", () => {
    const lightboxCarouselElement = productPreviewTemplate.firstElementChild.cloneNode(true);
    
    lightboxCarouselElement.classList.add("product-preview--lightbox")
    body.appendChild(lightboxCarouselElement);
    const lightBoxClass = new Carousel(lightboxCarouselElement);
    const closeBtn = lightboxCarouselElement.querySelector("#close-lightbox-btn");
    
    lightboxCarouselElement.addEventListener("click", closeLightbox)
})

