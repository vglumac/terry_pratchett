let openedBookModalIndex = null;

const bookTitles = document.querySelectorAll('div.book');

const booksByTitle = {};
booksInfo.forEach(bookInfo => {
    booksByTitle[bookInfo.title] = bookInfo;
});


bookTitles.forEach((bookTitle, index) => {
    bookTitle.addEventListener('click', (e) => {
        openedBookModalIndex = index;
        openModal(openedBookModalIndex);
    });
});

function closeModal() {
    document.querySelector('.modal').remove();
    window.removeEventListener('keydown', handleKeyDown);
}

function handleKeyDown() {
    if (event.key === 'Escape') {
        closeModal();
    }
    if (event.key === 'ArrowRight') {
        openedBookModalIndex++;
        openModal(openedBookModalIndex);
        if (document.querySelector('#button-modal-back').getAttribute('disabled') === '') {
            document.querySelector('#button-modal-back').removeAttribute('disabled');
        }
        
    }
    if (event.key === 'ArrowLeft') {
        openedBookModalIndex--;
        openModal(openedBookModalIndex);
        if (document.querySelector('#button-modal-moreInfo').getAttribute('disabled') === '') {
            document.querySelector('#button-modal-moreInfo').removeAttribute('disabled');
        }
    }
};

let a = 0;
function getModal(title, short, cover) {
    let modal = document.querySelector('.modal');

    if (!modal) {
        modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `<div class="modal__container">
                        <img alt="${title}" src="${cover}">
                        <h3>${title}</h3>
                        <p>${short}</p>
                        <button id="exit-button">X</button>
                        <button id="button-modal-back">PREVIOUS</button>
                        <button id="button-modal-moreInfo">NEXT</button>
                    </div>`;
        window.addEventListener('keydown', handleKeyDown);
        modal.addEventListener('click', () => closeModal(modal));
        modal.querySelector('.modal__container').addEventListener('click', (event) => event.stopPropagation());
        modal.querySelector('#exit-button').addEventListener('click', () => closeModal(modal));
        modal.querySelector('#button-modal-back').addEventListener('click', () => {
            openedBookModalIndex--;
            openModal(openedBookModalIndex);
            if (modal.querySelector('#button-modal-moreInfo').getAttribute('disabled') === '') {
                modal.querySelector('#button-modal-moreInfo').removeAttribute('disabled');
            }
        });
        modal.querySelector('#button-modal-moreInfo').addEventListener('click', () => {
            openedBookModalIndex++;
            openModal(openedBookModalIndex)
            if (modal.querySelector('#button-modal-back').getAttribute('disabled') === '') {
                modal.querySelector('#button-modal-back').removeAttribute('disabled');
            }
        });
    } else {
        console.log(a++);
        modal.querySelector('h3').innerText = title;
        modal.querySelector('img').src = cover;
        modal.querySelector('img').alt = title;
        modal.querySelector('p').innerText = short;
    }

    // set event handlers for closing (with click on backdrop, 'ESC' and 'exit' button)
    // set event handlers for next and previous same as for "arrowLeft" and "arrowRight"

    document.querySelector('body').appendChild(modal);

    return modal;
}

function openModal(nekiIndex) {
    if (nekiIndex < 0 || nekiIndex >= bookTitles.length) {
        return;
    }
    const bookElement = bookTitles[nekiIndex];
    const foundBook = booksByTitle[bookElement.innerText];

    if (!foundBook) {
        return;
    }

    const modal = getModal(foundBook.title, foundBook.short, foundBook.cover);
    if (nekiIndex == 0) {
        document.querySelector('#button-modal-back').setAttribute('disabled', '');

    } else if (nekiIndex == bookTitles.length - 1) {
        document.querySelector('#button-modal-moreInfo').setAttribute('disabled', '');
    }


    // fill modal content
    // set disabled attribute on buttons (if needed)
}

