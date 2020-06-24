const startBtn = document.querySelector('.modal-start-btn');

const startHandler = () => {
    const modal = document.querySelector('.modal');
    modal.classList.add('visible');

    const backdrop = document.createElement('div');
    backdrop.className = 'backdrop';
    backdrop.addEventListener('click', () => {
        modal.classList.remove('visible');
        backdrop.remove();
    });

    modal.insertAdjacentElement('beforebegin', backdrop);
};

startBtn.addEventListener('click', startHandler);