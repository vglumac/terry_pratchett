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
    let i = 1;
    bookTitles.forEach(b => {
        b.dataset.id = i;
        i++
    });

    const booksByTitle = {};
    booksInfo.forEach(bookInfo => {
        booksByTitle[bookInfo.title] = bookInfo;
    });

    for (let bookTitle of bookTitles) {

        bookTitle.addEventListener('click', (e) => {
            const foundBook = booksByTitle[e.target.innerText];
            createModal(foundBook.title, foundBook.short, foundBook.cover, bookTitle.dataset.id);
        });
    }
}

function createModal(bookName, bookDescription, bookCover, index) {

    let modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `<div class="modal__container">
                            <img src="${bookCover}" alt="${bookName}">
                            <h3>${bookName}</h3>
                            <p>${bookDescription}</p>
                            <div id="exit-button">X</div>
                            <div id="button-modal-back">PREVIOUS</div>
                            <div id="button-modal-moreInfo">NEXT</div>
                        </div>`;

    modal.querySelector('.modal__container').dataset.currentIndex = index;

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

    let buttonModalPrev = document.querySelector('#button-modal-back');
    let buttonModalNext = document.querySelector('#button-modal-moreInfo');
    buttonModalPrev.addEventListener('click', openPrevious);
    buttonModalNext.addEventListener('click', openNext);

    switch (modal.querySelector('.modal__container').dataset.currentIndex) {
        case '1':
            buttonModalPrev.style.backgroundColor = '#B8B8B8';
            buttonModalPrev.style.cursor = 'default';
            break;
        case '55':
            buttonModalNext.style.backgroundColor = '#B8B8B8';
            buttonModalNext.style.cursor = 'default';
            break;
    }



            // switch (modal.querySelector('.modal__container').dataset.currentIndex) {
            //     case '1':
            //         buttonModalNext.addEventListener('click', openNext);
            //         buttonModalPrev.removeEventListener('click', openPrevious);
            //         buttonModalPrev.style.backgroundColor = '#B8B8B8';
            //         buttonModalPrev.style.cursor = 'default';

            //     case '2':
            //         buttonModalPrev.addEventListener('click', openPrevious);
            //         break;
            //     case '54':
            //         buttonModalPrev.addEventListener('click', openPrevious);
            //         buttonModalNext.addEventListener('click', openNext);
            //     case '55':
            //         buttonModalPrev.addEventListener('click', openPrevious);
            //         buttonModalNext.removeEventListener('click', openPrevious);
            //         buttonModalNext.style.backgroundColor = '#B8B8B8';
            //         buttonModalNext.style.cursor = 'default';
            //         break;
            //     default:
            //         buttonModalPrev.addEventListener('click', openPrevious);
            //         buttonModalNext.addEventListener('click', openNext);
            // }

            window.addEventListener('keydown', (e) => {
                if (e.key == "ArrowRight") {
                    openNext();
                }
            });
            window.addEventListener('keydown', (e) => {
                if (e.key == "ArrowLeft") {
                    openPrevious();
                }
            });

            var offsetY = window.pageYOffset;
            document.querySelector('.main').style.top = `${offsetY}px`;

    }

    function openPrevious() {
        const books = {};
        booksInfo.forEach(bookInfo => {
            books[bookInfo.title] = bookInfo;
        });

        let currentIndex = document.querySelector('.modal__container').dataset.currentIndex;
        let buttonModalPrev = document.querySelector('#button-modal-back');
        let buttonModalNext = document.querySelector('#button-modal-moreInfo');

        let title = document.querySelector('.modal__container h3');
        let img = document.querySelector('.modal__container img');
        let short = document.querySelector('.modal__container p');

        buttonModalNext.style.backgroundColor = 'var(--accent-color-green)';
        buttonModalNext.style.cursor = 'pointer';

        let prevBookIndex = Number(currentIndex) - 1;
        let prevBook = document.querySelector(`[data-id="${prevBookIndex}"]`);

        const foundPrevBook = books[prevBook.innerText];
        title.innerText = foundPrevBook.title;
        img.src = foundPrevBook.cover;
        img.alt = `${foundPrevBook.title}`;
        short.innerText = foundPrevBook.short;
        document.querySelector('.modal__container').dataset.currentIndex = prevBook.dataset.id;
        if (document.querySelector('.modal__container').dataset.currentIndex == '1') {
            buttonModalPrev.style.backgroundColor = '#B8B8B8';
            buttonModalPrev.style.cursor = 'default';
        }

    }

    function openNext() {
        const books = {};
        booksInfo.forEach(bookInfo => {
            books[bookInfo.title] = bookInfo;
        });

        let currentIndex = document.querySelector('.modal__container').dataset.currentIndex;
        let buttonModalNext = document.querySelector('#button-modal-moreInfo');
        let buttonModalPrev = document.querySelector('#button-modal-back');
        let title = document.querySelector('.modal__container h3');
        let img = document.querySelector('.modal__container img');
        let short = document.querySelector('.modal__container p');

        buttonModalPrev.style.backgroundColor = 'var(--accent-color-green)';
        buttonModalPrev.style.cursor = 'pointer';

        let nextBookIndex = Number(currentIndex) + 1;
        let nextBook = document.querySelector(`[data-id="${nextBookIndex}"]`);

        const foundNextBook = books[nextBook.innerText];
        title.innerText = foundNextBook.title;
        img.src = foundNextBook.cover;
        img.alt = `${foundNextBook.title}`;
        short.innerText = foundNextBook.short;
        document.querySelector('.modal__container').dataset.currentIndex = nextBook.dataset.id;

        if (document.querySelector('.modal__container').dataset.currentIndex == '55') {
            buttonModalNext.style.backgroundColor = '#B8B8B8';
            buttonModalNext.style.cursor = 'default';
        }
    }


    onClick();
