import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchImages } from './fetchImages';
import { renderImages } from './renderImages';

const form = document.querySelector(".search-form");
const loadMoreBtn = document.querySelector(".load-more");

let page = 1;


form.addEventListener("submit", handleSubmit);


function handleSubmit(event) {
    event.preventDefault();
  
    const {elements: {searchQuery}} = event.currentTarget;

    fetchImages(searchQuery.value)
        .then((searchResults) => {
            renderImages(searchResults.hits);
            new SimpleLightbox('.gallery a');
        })
        .catch((error) => console.log(error));

    event.currentTarget.reset();
}
