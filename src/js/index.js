import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchImages } from './fetchImages';
import { createMarkup } from './createMarkup';

const form = document.querySelector(".search-form");
const loadMoreBtn = document.querySelector(".load-more");
const cardSet = document.querySelector(".gallery");

let simpleLightbox;
let page = 1;
let savedSearchQuery;
let totalImgFound;
let displayedImgCounter;


form.addEventListener("submit", handleSubmit);
loadMoreBtn.addEventListener("click", handleClick);



// Функції

function handleSubmit(event) {
    event.preventDefault();

    if (page != 1) page = 1;
    
    // Деструктуризуємо об'єкт події сабміту, та дістаємо значення пошукового запиту
    const { elements: { searchQuery } } = event.currentTarget;
  
    // Ховаємо кнопку "Load More"
    loadMoreBtn.style.display = "none";
    
    // Перевіряємо чи значення пушокового запиту не пустий рядок
    if (searchQuery.value != "") {
        
        // Зберігаємо значення пошукового запиту
        savedSearchQuery = searchQuery.value;

        fetchImages(searchQuery.value, page)
            .then((searchResults) => {
            
                if (searchResults.hits.length != 0) {
                    
                    // Сповіщення і збереження кількості отриманих результатів
                    totalImgFound = searchResults.totalHits;
                    Notify.info(`Hooray! We found ${totalImgFound} images.`);

                    // Створення розмітки, та галереї SimpleLightbox
                    cardSet.innerHTML = createMarkup(searchResults.hits);
                    simpleLightbox = new SimpleLightbox('.gallery a');

                    // Скролиінг
                    const { height: cardHeight } = document
                    .querySelector(".gallery")
                    .firstElementChild.getBoundingClientRect();

                    window.scrollBy({
                        top: cardHeight * 2,
                        behavior: "smooth",
                    });
                    
                    // Підрахунок зображень, що вже відобразились на сторінці
                    displayedImgCounter = searchResults.hits.length;
                    
                    // Поява кнопки "Load More"
                    loadMoreBtn.style.display = "block";
                }
                else Notify.info('Sorry, there are no images matching your search query. Please try again.');
            })
            .catch((error) => console.log(error));
    }
    event.currentTarget.reset();
}


function handleClick() {

    if (displayedImgCounter < totalImgFound) {

        page++;

        fetchImages(savedSearchQuery, page)
        .then((searchResults) => {

            cardSet.insertAdjacentHTML("beforeend", createMarkup(searchResults.hits));
            simpleLightbox.refresh();
            
            displayedImgCounter += searchResults.hits.length;
        
        })
        .catch((error) => console.log(error));
    }
    else Notify.info("We're sorry, but you've reached the end of search results.");
}




