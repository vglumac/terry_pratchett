/* <div class="page-blur"></div>
<div class="modal">
    <div class="modal__container">
        <img src="images/eric.jpg" alt="eric">
        <h3>Eric</h3>
        <p>Neki tekst ovde ide o knjizi i ima nekoliko redova, opisuje radnju knjige.</p>
        <a href="#">Back</a>
        <a href="#">More info</a>
    </div>
</div> */

function onClick() {

    const bookTitles = document.querySelectorAll('div.book');

    const booksByTitle = {};
    booksInfo.forEach(bookInfo => {
        booksByTitle[bookInfo.title] = bookInfo;
    });

    bookTitles.forEach((bookTitle, index) => {
        bookTitle.addEventListener('click', (e) => {
            const foundBook = booksByTitle[e.target.innerText];
            createModal(foundBook, index, bookTitles, booksByTitle);

        });
    });
}

function createModal(foundBook, index, bookTitles, booksByTitle) {
    // add modal to DOM and set event handlers for closing (with click on backdrop, 'ESC' and 'exit' button)
    let modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `<div class="modal__container">
                            <img src="${foundBook.cover}" alt="${foundBook.title}">
                            <h3>${foundBook.title}</h3>
                            <p>${foundBook.short}</p>
                            <button id="exit-button">X</button>
                            <button id="button-modal-back">PREVIOUS</button>
                            <button id="button-modal-moreInfo">NEXT</button>
                        </div>`;
    switch (index) {
        case 0: modal.querySelector('#button-modal-back').setAttribute('disabled', '');
            break;
        case (bookTitles.length - 1): modal.querySelector('#button-modal-moreInfo').setAttribute('disabled', '');
            break;
    }

    window.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            modal.remove();
        }
    });

    modal.addEventListener('click', () => {
        modal.remove();
    });

    modal.querySelector('.modal__container').addEventListener('click', e => {
        e.stopPropagation();
    });

    modal.querySelector('#exit-button').addEventListener('click', () => {
        modal.remove();
    });

    document.querySelector('body').appendChild(modal);

    openModal(index, bookTitles, booksByTitle);

}

function openModal(index, bookTitles, booksByTitle) {
    // adds content to existing modal in DOM, event listeners etc.
    let buttonNext = document.querySelector('#button-modal-moreInfo');
    let buttonPrev = document.querySelector('#button-modal-back');

    buttonNext.addEventListener('click', () => {
        index++;
        changeModal(index, bookTitles, booksByTitle, buttonNext, buttonPrev);
        if (buttonPrev.getAttribute('disabled') === '') {
            buttonPrev.removeAttribute('disabled');
        }
        if (index === bookTitles.length - 1) {
            buttonNext.setAttribute('disabled', '');
        }
    });

    buttonPrev.addEventListener('click', () => {
        index--;
        changeModal(index, bookTitles, booksByTitle, buttonNext, buttonPrev);
        if (buttonNext.getAttribute('disabled') === '') {
            buttonNext.removeAttribute('disabled');
        }
        if (index === 0) {
            buttonPrev.setAttribute('disabled', '');
        }
    });
}

function changeModal(index, bookTitles, booksByTitle, buttonNext, buttonPrev) {
    let title = document.querySelector('.modal__container h3');
    let img = document.querySelector('.modal__container img');
    let short = document.querySelector('.modal__container p');
    let newBook = {};
    newBook = booksByTitle[bookTitles[index].innerText];
    title.innerText = newBook.title;
    img.src = newBook.cover;
    img.alt = newBook.title;
    short.innerText = newBook.short;
}

onClick();
