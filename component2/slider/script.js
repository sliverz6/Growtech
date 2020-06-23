class UIHelper {
    // static isSliding = false

    static slide(type, time) {
        // if (this.isSliding) {
        //     return;
        // }

        const slideItems = document.querySelectorAll('.slider__item');
        
        slideItems.forEach(slideItem => {
            const containerWidth = slideItem.parentElement.clientWidth;
            const currentXPos = parseInt(slideItem.style.left);
            const moveAmount = type === 'left' ? currentXPos + containerWidth : currentXPos - containerWidth;
            slideItem.animate([
                // keyframes
                { left: `${slideItem.style.left}` },
                { left: `${moveAmount}px` },
            ], {
                duration: time,
                fill: "forwards",
                easing: "cubic-bezier(0.42, 0, 0.58, 1)"
            });
            slideItem.style.left = `${moveAmount}px`;
            this.isSliding = true;

            // setTimeout(() => {
            //     this.isSliding = false;
            // }, 500);
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
    isSliding = false;

    constructor(duration) {
        this.duration = duration;
        this.connectButtonsElement();
        this.connectSlideElement();
    }

    slide(type) {
        if (this.currentSlideIdx > 0 && type === 'left') {
            this.currentSlideIdx--;
            UIHelper.slide(type, this.duration);
        } else if (this.currentSlideIdx < this.slideList.length - 1 && type === 'right') {
            this.currentSlideIdx++;
            UIHelper.slide(type, this.duration);
        }
    }

    buttonHandler(e) {
        if (this.isSliding) {
            return;
        }

        this.isSliding = true;
        if (e.target.classList.contains('slider__btn--left')) {
            this.slide('left');
        } else {
            this.slide('right');
        }

        setTimeout(() => {
            this.isSliding = false;
        }, this.duration);
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

new Slider(300);