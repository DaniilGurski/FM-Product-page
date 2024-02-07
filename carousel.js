const track = document.querySelector(".product-carousel__track") // <ul> element
const slides = Array.from(track.children);
const nextButton = document.querySelector("#carousel-next-button")
const prevButton = document.querySelector("#carousel-prev-button")
const carouselNav = document.querySelector(".carousel-navigation")
const carouselNavItems = Array.from(carouselNav.children)

const slideWidth= slides[0].getBoundingClientRect().width; 


// arrange the slides next to one another
const setSlidePosition = (slide, index) => {
    slide.style.left = `${slideWidth * index}px`;
}

const moveToSlide = (track, currentSlide, targetSlide) => {
    // If there is no slide to move to 
    if (targetSlide === null) {
        return
    }
    
    track.style.transform = `translateX(-${targetSlide.style.left})`;
    currentSlide.removeAttribute("data-current-slide");
    targetSlide.setAttribute("data-current-slide", "")
    
}
slides.forEach(setSlidePosition);


// When I click left, move slides to the left
prevButton.addEventListener("click", e => {
    const currentSlide = track.querySelector("[data-current-slide]")
    const prevSlide = currentSlide.previousElementSibling;
    
    moveToSlide(track, currentSlide, prevSlide);
})


// When I click right, move to the right
nextButton.addEventListener("click", e => {
    const currentSlide = track.querySelector("[data-current-slide]")
    const nextSlide = currentSlide.nextElementSibling;
    
    moveToSlide(track, currentSlide, nextSlide)
})


// Toggle between carousel navigation items
const toggleCarouselNavItems = e => {
    console.log(item)
}


carouselNav.addEventListener("click", e => {
    const selectedItem = e.target.closest(".carousel-navigation__item");

    if (!selectedItem) {
        return;
    }

    for (let carouselNavItem of carouselNavItems) {
        carouselNavItem.classList.toggle("carousel-navigation__item--selected", carouselNavItem === selectedItem)
    }
})