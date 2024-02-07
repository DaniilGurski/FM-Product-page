const track = document.querySelector(".product-carousel__track"); // <ul> element
const slides = Array.from(track.children);
const nextButton = document.querySelector("#carousel-next-button");
const prevButton = document.querySelector("#carousel-prev-button");
const carouselNav = document.querySelector(".carousel-navigation");
const carouselNavItems = Array.from(carouselNav.children);
const navItemsMap = new Map();

const slideWidth= slides[0].getBoundingClientRect().width; 


const moveToSlide = (track, currentSlide, targetSlide) => {
    // If there is no slide to move to 
    if (targetSlide === null) {
        return
    }
    
    track.style.transform = `translateX(-${targetSlide.style.left})`;
    currentSlide.removeAttribute("data-current-slide");
    targetSlide.setAttribute("data-current-slide", "")
}


// Arrange the slides next to one another
const setSlidePosition = (slide, index) => {
    slide.style.left = `${slideWidth * index}px`;
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


// Controlling the carousel with navigation

// Bind each carousel nav item to a number from 1, 4.
const linkNavItems = (item, index) => {
    navItemsMap.set(item, (index + 1).toString())
}

carouselNavItems.forEach(linkNavItems)


carouselNav.addEventListener("click", e => {
    const selectedItem = e.target.closest(".carousel-navigation__item");
    
    if (!selectedItem) {
        return;
    }
    
    for (let carouselNavItem of carouselNavItems) {
        carouselNavItem.classList.toggle("carousel-navigation__item--selected", carouselNavItem === selectedItem)
    }
    
    // Use selected item as a key in the map and get slide number
    const slideNumber = navItemsMap.get(selectedItem);

    // Using the query selector we select a carousel slide with a data-slide value matching the number we got from the map
    const currentSlide = track.querySelector("[data-current-slide]");
    const targetSlide = track.querySelector(`.product-carousel__slide[data-slide='${slideNumber}']`);

    moveToSlide(track, currentSlide, targetSlide);
})
