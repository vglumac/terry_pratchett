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
    const books = JSON.parse(JSON.stringify(booksInfo));

    let bookTitleModal = '';
    let bookDescriptionModal = '';
    let bookCoverModal = '';

    for (let bookTitle of bookTitles) {
        bookTitle.addEventListener('click', (e) => {
            for (let i=0; i<books.length; i++) {
            if (e.target.innerText == books[i].title) {
                bookTitleModal = books[i].title;
                bookDescriptionModal = books[i].short;
                bookCoverModal = books[i].cover;
                createModal(bookTitleModal, bookDescriptionModal, bookCoverModal)
            } else {
                console.log('error');
            }
            }
        } )
    }

}

function createModal(bookName, bookDescription, bookCover) {
    let pageBlur = document.createElement('div');
    pageBlur.classList.add('page-blur');

    let modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `<div class="modal__container">
                            <img src="${bookCover}" alt="${bookName}">
                            <h3>${bookName}</h3>
                            <p>${bookDescription}</p>
                            <a href="#" id="button-modal-back">Back</a>
                            <a href="#" id="button-modal-moreInfo">More info</a>
                        </div>`;

    let buttonModalBack = modal.querySelector('#button-modal-back');
    let buttonModalInfo = modal.querySelector('#button-modal-moreInfo');

    buttonModalBack.addEventListener('click', () => {
        pageBlur.remove();
        modal.remove();
    });

    buttonModalInfo.addEventListener('click', () => {
        callbackMoreInfo();
        pageBlur.remove();
        modal.remove();
    });

    document.querySelector('body').appendChild(pageBlur);
    document.querySelector('body').appendChild(modal);
}

onClick();
