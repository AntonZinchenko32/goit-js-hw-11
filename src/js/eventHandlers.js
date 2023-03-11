import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchImages } from './fetchImages';
import { renderImages } from './renderImages';


const cardSet = document.querySelector(".gallery");


let simpleLightbox;

let page = 1;

let savedSearchQuery;

let totalImgAmount;

let displayedImgCounter;



export function handleSubmit(event) {
    event.preventDefault();
    
    const { elements: { searchQuery } } = event.currentTarget;
  
    if(searchQuery.value != "") {
        
        savedSearchQuery = searchQuery.value;

        fetchImages(searchQuery.value, page)
            .then((searchResults) => {
            
                if (searchResults.hits.length != 0) {
      
                    cardSet.innerHTML = renderImages(searchResults.hits);
                    simpleLightbox = new SimpleLightbox('.gallery a');

                    console.log("initial page counter", page);
                
                    displayedImgCounter = searchResults.hits.length;
                    totalImgAmount = searchResults.totalHits;
                
                    console.log("page=", page);
                    console.log("displayed", displayedImgCounter);
                    console.log("limit", totalImgAmount);
                }
                else Notify.info('Sorry, there are no images matching your search query. Please try again.');
            })
            .catch((error) => console.log(error));
    }
}


export function loadMore() {

    if (displayedImgCounter < totalImgAmount) {

        page++;

        fetchImages(savedSearchQuery, page)
        .then((searchResults) => {

            cardSet.insertAdjacentHTML("beforeend", renderImages(searchResults.hits));
            simpleLightbox.refresh();
            displayedImgCounter += searchResults.hits.length;

            console.log("page=", page);
            console.log("displayed", displayedImgCounter);
            console.log("limit", totalImgAmount);
        })
        .catch((error) => console.log(error));
    }
    else Notify.info("We're sorry, but you've reached the end of search results.");
}