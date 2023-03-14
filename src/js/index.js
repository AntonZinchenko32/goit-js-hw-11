import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchImages } from './fetchImages';
import { createMarkup } from './createMarkup';
import { autoScrolling } from "./auto-scrolling";

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

// Перевірка роботи сервера
console.log("te123s99t");

// Функції

async function handleSubmit(event) {
    event.preventDefault();
    
    // У разі нового пошуку - оновлюємо сторінку запиту та ховаємо кнопку "Load more"
    if (page != 1) {
        page = 1;
        loadMoreBtn.style.display = "none";
    }
    
    // Деструктуризуємо об'єкт події сабміту, та дістаємо значення пошукового запиту
    const { elements: { searchQuery } } = event.currentTarget;
    
    // Прибираємо зайві пробіли на початку і в кінці рядку, якщо воини є
    const trimmedSearchQuery = searchQuery.value.trim();
  
    
    // Перевіряємо чи значення пушокового запиту не пустий рядок
    if (trimmedSearchQuery) {
        
        // Зберігаємо значення пошукового запиту
        savedSearchQuery = trimmedSearchQuery;

        // Видаляємо введені дані з форми
            event.currentTarget.reset();

        // Робимо забит до бекенду та рендер зображень
        try {
            const recivedImg = await fetchImages(trimmedSearchQuery, page);
            render(recivedImg);

        } catch (error) { console.log(error.message) }
    }
}

function render(searchResults) {
    
    if (searchResults.hits.length != 0) {

        // Рендеримо знайдені зображення
        cardSet.innerHTML = createMarkup(searchResults.hits);
        simpleLightbox = new SimpleLightbox('.gallery a');
                    
        // Сповіщюємо користувача про кількість знайденних зображень, та зберігаємо ці данні у змінну 
        Notify.success(`Hooray! We found ${searchResults.totalHits} images.`);
        totalImgFound = searchResults.totalHits;
            
        // Ведемо підрахунок зображень, що вже відобразились на сторінці
        displayedImgCounter = searchResults.hits.length;

        // Перевірка
        console.log("displayed: ",displayedImgCounter);
        console.log("total: ",totalImgFound);
        console.log("savedQuery: ", savedSearchQuery);
        console.log("Page number: ",page);

        // Перевіряємо чи не скінчились зображення для завантаження, якщо ні - відображаємо кнопку "Load More"
        if (displayedImgCounter < totalImgFound) loadMoreBtn.style.display = "block";
    }
    else {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        cardSet.innerHTML = "";
        loadMoreBtn.style.display = "none";
    }
}

async function handleClick() {

    // Оновлюємо сторінку запиту до бекенду
    page++;

    // Робимо повторний запит до бекенду та рендер нових зображень
    try {
        const recivedImg = await fetchImages(savedSearchQuery, page);
        renderMore(recivedImg);
        autoScrolling();

    } catch (error) { console.log(error.message) }
    
}

function renderMore(searchResults) {

        // Рендеримо нові знайдені зображення
        cardSet.insertAdjacentHTML("beforeend", createMarkup(searchResults.hits));
        simpleLightbox.refresh();
        
        // Ведемо підрахунок відображених зображень
        displayedImgCounter += searchResults.hits.length;

        // Перевірка
        console.log("displayed: ",displayedImgCounter);
        console.log("total: ",totalImgFound);
        console.log("savedQuery: ", savedSearchQuery);
        console.log("Page number: ",page);

        // Перевіряємо чи не скінчились зображення для завантаження, якщо так - ховаємо кнопку "Load More" і сповіщаємо про це користувача
        if (displayedImgCounter >= totalImgFound) {
            loadMoreBtn.style.display = "none";
            Notify.info("We're sorry, but you've reached the end of search results.");
        }
    }




