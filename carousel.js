const track = document.querySelector(".product-carousel__track") // <ul> element
const slides = Array.from(track.children);
const nextButton = document.querySelector("#carousel-next-button")
const prevButton = document.querySelector("#carousel-prev-button")

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


// when I click left, move slides to the left
prevButton.addEventListener("click", e => {
    const currentSlide = track.querySelector("[data-current-slide]")
    const prevSlide = currentSlide.previousElementSibling;

    moveToSlide(track, currentSlide, prevSlide);
})


// when I click right, move to the right
nextButton.addEventListener("click", e => {
    const currentSlide = track.querySelector("[data-current-slide]")
    const nextSlide = currentSlide.nextElementSibling;

    moveToSlide(track, currentSlide, nextSlide)
})