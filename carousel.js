class Carousel {
    constructor(carouselContainer) {
        this.container = carouselContainer;
        this.track = this.container.querySelector(".product-carousel__track");
        this.slides = Array.from(this.track.children);
        this.nextBtn = this.container.querySelector("#carousel-next-button");
        this.prevBtn = this.container.querySelector("#carousel-prev-button");

        this.nav = this.container.querySelector(".carousel-navigation");
        this.navItems = Array.from(this.nav.children);
        this.slideWidth = this.slides[0].getBoundingClientRect().width;

        this.slides.forEach(this.setSlidePosition.bind(this));
        this.nextBtn.addEventListener("click", this.moveNext.bind(this));
        this.prevBtn.addEventListener("click", this.movePrev.bind(this));
        this.nav.addEventListener("click", this.handleNavClick.bind(this));
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
        currentSlide.removeAttribute("data-current");
        targetSlide.setAttribute("data-current", "");

        this.markSelectedNavItem(this.navItems[this.slides.indexOf(targetSlide)]);
    }


    getCurrentSlide() {
        return this.slides.filter((slide) => slide.hasAttribute("data-current"))[0];
    }

    
    movePrev() {
        const currentSlide = this.getCurrentSlide();
        const prevSlide = currentSlide.previousElementSibling;
        
        this.moveToSlide(currentSlide, prevSlide);
    }
    

    moveNext() {
        const currentSlide = this.getCurrentSlide();
        const nextSlide = currentSlide.nextElementSibling;
        
        this.moveToSlide(currentSlide, nextSlide);
    }
    

    markSelectedNavItem(selectedItem) {
        for (let navItem of this.navItems) {
            navItem.classList.toggle("carousel-navigation__item--selected", navItem === selectedItem);
        }
    }
    

    handleNavClick(e) {
        const selectedItem = e.target.closest(".carousel-navigation__item");
        
        if (!selectedItem) {
            return;
        }

        const currentSlide = this.getCurrentSlide()
        const targetSlide = this.slides[this.navItems.indexOf(selectedItem)]

        this.moveToSlide(currentSlide, targetSlide)
    }
    

    convertToLightbox() {
        this.container.classList.add("product-preview--lightbox");
    }
}

export default Carousel
