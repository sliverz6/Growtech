class SlideItem {
    constructor(element) {
        this.element = element;
    }
}

class Slider {
    slideList = [];

    init() {
        this.connectButtonElement();
        this.connectSlideElement();
    }

    slide(type) {
        const slideItems = document.querySelectorAll('.slider__item');

        slideItems.forEach((slideItem, index) => {
            const containerWidth = slideItem.parentElement.clientWidth;
            const currentXPos = parseInt(slideItem.style.left);
            const targetXPos = type === 'left' ? currentXPos + containerWidth : currentXPos - containerWidth;
            slideItem.style.left = `${targetXPos}px`;
        });
    }

    buttonHandler(e) {
        if (e.target.classList.contains('slider__btn--left')) {
            this.slide('left')
        } else {
            this.slide('right')
        }
    }

    connectButtonElement() {
        const buttons = document.querySelectorAll('.slider__btn');
        for (const button of buttons) {
            button.addEventListener('click', this.buttonHandler.bind(this));
        }
    }

    connectSlideElement() {
        const slideItems = document.querySelectorAll('.slider__item');
        slideItems.forEach((slideItem, index) => {
            const containerWidth = slideItem.parentElement.clientWidth;
            slideItem.style.position = 'absolute';
            slideItem.style.left = `${containerWidth * index}px`;

            this.slideList.push(new SlideItem(slideItem));
        });
    }
}

const slider = new Slider();
slider.init();