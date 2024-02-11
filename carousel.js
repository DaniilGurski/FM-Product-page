class Carousel {
    constructor(carouselContainer) {
        this.container = carouselContainer;
        this.track = this.container.querySelector(".product-carousel__track");
        this.slides = Array.from(this.track.children);
        this.nextBtn = this.container.querySelector("#carousel-next-button");
        this.prevBtn = this.container.querySelector("#carousel-prev-button");
        this.nav = this.container.querySelector(".carousel-navigation");
        this.navItems = Array.from(this.nav.children);
        this.navItemsMap = new Map();
        this.slideWidth = this.slides[0].getBoundingClientRect().width;
        this.slides.forEach(this.setSlidePosition.bind(this));
        this.navItems.forEach(this.linkNavItems.bind(this));
        this.nextBtn.addEventListener("click", this.moveNext.bind(this));
        this.prevBtn.addEventListener("click", this.movePrev.bind(this));
        this.nav.addEventListener("click", this.toggleBetweenItems.bind(this));
    }
    
    setSlidePosition(slide, index) {
        slide.style.left = `${this.slideWidth * index}px`;
    }
    
    moveToSlide(currentSlide, targetSlide) {
        // If there is no slide to move to 
        if (targetSlide === null) {
            return
        }
        
        this.track.style.transform = `translateX(-${targetSlide.style.left})`;
        currentSlide.removeAttribute("data-current-slide");
        targetSlide.setAttribute("data-current-slide", "")
    }

    
    movePrev() {
        const currentSlide = this.track.querySelector("[data-current-slide]");
        const prevSlide = currentSlide.previousElementSibling;
        
        this.moveToSlide(currentSlide, prevSlide);
    }


    moveNext() {
        const currentSlide = this.track.querySelector("[data-current-slide]");
        const nextSlide = currentSlide.nextElementSibling;
        
        this.moveToSlide(currentSlide, nextSlide);
    }


    linkNavItems(item, index) {
        this.navItemsMap.set(item, (index + 1).toString())
    }


    toggleBetweenItems(e) {
        const selectedItem = e.target.closest(".carousel-navigation__item");
    
        if (!selectedItem) {
            return;
        }
        
        for (let carouselNavItem of this.navItems) {
            carouselNavItem.classList.toggle("carousel-navigation__item--selected", carouselNavItem === selectedItem)
        }
        
        // Use selected item as a key in the map and get slide number
        const slideNumber = this.navItemsMap.get(selectedItem);
    
        // Using the query selector we select a carousel slide with a data-slide value matching the number we got from the map
        const currentSlide = this.track.querySelector("[data-current-slide]");
        const targetSlide = this.track.querySelector(`.product-carousel__slide[data-slide='${slideNumber}']`);
    
        this.moveToSlide(currentSlide, targetSlide);
    }


    convertToLightbox() {
        this.container.classList.add("product-preview--lightbox");
    }
}

export default Carousel;