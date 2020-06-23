class UIHelper {
    static slide(type) {
        const slideItems = document.querySelectorAll('.slider__item');

        slideItems.forEach(slideItem => {
            const containerWidth = slideItem.parentElement.clientWidth;
            const currentXPos = parseInt(slideItem.style.left);
            const targetXPos = type === 'left' ? currentXPos + containerWidth : currentXPos - containerWidth;
            slideItem.style.left = `${targetXPos}px`;
        });
    }
}

class SlideItem {
    constructor(index, element) {
        this.index = index;
        this.element = element;
    }
}

class Slider {
    slideList = [];
    currentSlideIdx;

    init() {
        this.connectButtonsElement();
        this.connectSlideElement();
    }

    slide(type) {
        if (this.currentSlideIdx > 0 && type === 'left') {
            this.currentSlideIdx--;
            UIHelper.slide(type);
        } else if (this.currentSlideIdx < this.slideList.length - 1 && type === 'right') {
            this.currentSlideIdx++;
            UIHelper.slide(type);
        }
    }

    buttonHandler(e) {
        if (e.target.classList.contains('slider__btn--left')) {
            this.slide('left')
        } else {
            this.slide('right')
        }
    }

    connectButtonsElement() {
        const buttons = document.querySelectorAll('.slider__btn');
        for (const button of buttons) {
            button.addEventListener('click', this.buttonHandler.bind(this));
        }
    }

    connectSlideElement() {
        const slideItems = document.querySelectorAll('.slider__item');
        let defaultSlideIdx;
        slideItems.forEach((slideItem, index) => {
            slideItem.style.position = 'absolute';
            this.slideList.push(new SlideItem(index, slideItem));
            if (slideItem.classList.contains('home')) {
                defaultSlideIdx = index;
            }
        });

        this.setDefaultView(defaultSlideIdx);
    }

    setDefaultView(slideIdx = 0) {
        const slideItems = document.querySelectorAll('.slider__item');
        slideItems.forEach((slideItem, index) => {
            const containerWidth = slideItem.parentElement.clientWidth;
            slideItem.style.left = `${(containerWidth * index) - (containerWidth * slideIdx)}px`;
        });
        this.currentSlideIdx = slideIdx;
    }
}

const slider = new Slider();
slider.init();