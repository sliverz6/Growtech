class UIHelper {
   
}

class Slide {
    constructor(index) {
        this.index = index;
    }
}

class DotMenu {
    constructor(currentSlideIdx, updateSlideFunction) {
        this.currentSlideIndex = currentSlideIdx;
        this.updateSlideHandler = updateSlideFunction;
        this.connectDotMenu();
        this.updateDotMenu(this.currentSlideIndex);
    }

    updateDotMenu(slideIdx) {
        const dots = document.querySelectorAll('.slider__dot');
        dots.forEach((dot, index) => {
            if (index === slideIdx) {
                dot.classList.add('current');
            } else {
                dot.classList.remove('current');
            }
        });
    }

    dotHandler(index) {
        this.currentSlideIndex = index;
        this.updateSlideHandler(this.currentSlideIndex);
        this.updateDotMenu(this.currentSlideIndex);
    }

    connectDotMenu() {
        const dots = document.querySelectorAll('.slider__dot');
        dots.forEach((dot, index) => {
            dot.addEventListener('click', this.dotHandler.bind(this, index));
        });
    }
}

class Slider {
    slides = [];
    slideTime = 500;
    auto = false;
    autoSlideTime = 5000;

    constructor(currentSlideIdx) {
        this.currentSlideIndex = currentSlideIdx;
        this.setting();
        this.init();
    }
    
    setting() {
        const slider = document.querySelector('.slider');
        if (slider.classList.contains('auto')) {
            this.auto = true;
        }
    }

    init() {
        this.dotMenu = new DotMenu(this.currentSlideIndex, this.setSlide.bind(this));

        const slidesEl = document.querySelectorAll('.slider__item');
        slidesEl.forEach((slide, index) => { 
            this.slides.push(new Slide(index));
            const slideWidth = slide.clientWidth;
            slide.style.left = `${slideWidth * index - slideWidth * this.currentSlideIndex}px`;
        });

        this.connectButton();
    }

    moveSlide(prevPos, curPos, time) {
        const slidesEl = document.querySelectorAll('.slider__item');
        slidesEl.forEach((slide, index) => {
            slide.animate([
                { left: prevPos[index] },
                { left: curPos[index] }
            ], {
                duration: time,
                fill: "forwards",
                easing: "cubic-bezier(0.42, 0, 0.58, 1)"
            });
        });
    }

    setSlide(index) {
        if (index >= 0) {
            this.currentSlideIndex = index;
        }
        
        let previousPos = [];
        let currentPos = [];

        const slidesEl = document.querySelectorAll('.slider__item');
        slidesEl.forEach((slide, index) => {
            previousPos.push(slide.style.left);

            const slideWidth = slide.clientWidth;
            slide.style.left = `${slideWidth * index - slideWidth * this.currentSlideIndex}px`;

            currentPos.push(slide.style.left);
        });

        this.moveSlide(previousPos, currentPos, this.slideTime);
        
        this.dotMenu.updateDotMenu(this.currentSlideIndex);
    }

    connectButton() {
        const leftBtn = document.querySelector('.slider__btn--left');
        const rightBtn = document.querySelector('.slider__btn--right');
        leftBtn.addEventListener('click', this.btnHandler.bind(this, 'left'));
        rightBtn.addEventListener('click', this.btnHandler.bind(this, 'right'));

        if (this.auto) {
            setInterval(this.btnHandler.bind(this, 'right'), this.autoSlideTime);
        }
    }

    btnHandler(direction) {
        if (direction === 'left') {
            if (this.currentSlideIndex === 0) {
                this.currentSlideIndex = this.slides.length - 1;
            } else {
                this.currentSlideIndex--;
            }
            this.setSlide();
        } else if (direction === 'right') {
            if (this.currentSlideIndex === this.slides.length - 1) {
                this.currentSlideIndex = 0;
            } else {
                this.currentSlideIndex++;
            }
            this.setSlide();
        }
    }
}

new Slider(0);