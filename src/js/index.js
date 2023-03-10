import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchImages } from './fetchImages';
import { renderImages } from './renderImages';


const form = document.querySelector(".search-form");
const cardSet = document.querySelector(".gallery");
const loadMoreBtn = document.querySelector(".load-more");

let simpleLightbox;

let page = 1;

let savedSearchQuery;

let totalImgCounter;
let displayedImgCounter;

console.log("testing9999");
console.log("testinыаыванег123999999999994");
console.log("hello world");


form.addEventListener("submit", handleSubmit);
loadMoreBtn.addEventListener("click", loadMore)

function handleSubmit(event) {
    event.preventDefault();
  
    const { elements: { searchQuery } } = event.currentTarget;
    savedSearchQuery = searchQuery.value;

    fetchImages(searchQuery.value, page)
        .then((searchResults) => {
            
            if (searchResults.hits.length != 0) {
      
                cardSet.innerHTML = renderImages(searchResults.hits);
                simpleLightbox = new SimpleLightbox('.gallery a');

                console.log("initial page counter", page);
                
                displayedImgCounter = searchResults.hits.length;
                totalImgCounter = searchResults.totalHits;
                page++;
                
                console.log("page=", page);
                console.log("displayed", displayedImgCounter);
                console.log("limit", totalImgCounter);
            }
            else Notify.info('Sorry, there are no images matching your search query. Please try again.');
        })
        .catch((error) => console.log(error));

    event.currentTarget.reset();
}

function loadMore() {

    fetchImages(savedSearchQuery, page)
        .then((searchResults) => {
            
            if (displayedImgCounter < totalImgCounter) {
                
                cardSet.insertAdjacentHTML("beforeend", renderImages(searchResults.hits));
                simpleLightbox.refresh();
                displayedImgCounter += searchResults.hits.length;
                page++;

                console.log("page=", page);
                console.log("displayed", displayedImgCounter);
                console.log("limit", totalImgCounter);

            }
            else Notify.info("We're sorry, but you've reached the end of search results.");
        })
        .catch((error) => console.log(error));
}