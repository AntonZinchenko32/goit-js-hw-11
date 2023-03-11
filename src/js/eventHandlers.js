import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchImages } from './fetchImages';
import { createMarkup } from './createMarkup';


const cardSet = document.querySelector(".gallery");


let simpleLightbox;

let page = 1;

let savedSearchQuery;

let totalImgFound;

let displayedImgCounter;



export function handleSubmit(event) {
    
    event.preventDefault();

    if (page != 1) page = 1;
    
    const { elements: { searchQuery } } = event.currentTarget;
  
    if(searchQuery.value != "") {
        
        savedSearchQuery = searchQuery.value;

        fetchImages(searchQuery.value, page)
            .then((searchResults) => {
            
                if (searchResults.hits.length != 0) {
                    totalImgFound = searchResults.totalHits;
      
                    cardSet.innerHTML = createMarkup(searchResults.hits);
                    simpleLightbox = new SimpleLightbox('.gallery a');

                    displayedImgCounter = searchResults.hits.length;
                    
                }
                else Notify.info('Sorry, there are no images matching your search query. Please try again.');
            })
            .catch((error) => console.log(error));
    }
}


export function handleClick() {

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