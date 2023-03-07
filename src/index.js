import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchImages } from './fetchImages';



const form = document.querySelector(".search-form");
const cardSet = document.querySelector(".gallery");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
    console.log("test123999");
  event.preventDefault();
  
    const {
    elements: { searchQuery }
  } = event.currentTarget;

    fetchImages(searchQuery.value)
        .then((searchResults) => {
            renderImages(searchResults.hits);
            new SimpleLightbox('.gallery a',{captionDelay: "250"});
        })
    .catch((error) => console.log(error));

    event.currentTarget.reset();
}


function renderImages(images) {
    let markup;

    console.log(images);

    if (images.length != 0) {
        cardSet.innerHTML = "";
        markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `
            <a class="link" href=${largeImageURL}>
                <div class="photo-card">
                    <img class="image" src=${webformatURL} alt=${tags} loading="lazy" />
                    <div class="info">
                        <p class="info-item">
                            <b>Likes</b>
                            <span class="info-value">${likes}</span>
                        </p>
                        <p class="info-item">
                            <b>Views</b>
                            <span class="info-value">${views}</span>
                        </p>
                        <p class="info-item">
                            <b>Comments</b>
                            <span class="info-value">${comments}</span>
                        </p>
                        <p class="info-item">
                            <b>Downloads</b>
                            <span class="info-value">${downloads}</span>
                        </p>
                    </div>
                </div>
            </a>
            `;
        }).join("");
    
    cardSet.innerHTML = markup;
    }

    else Notify.info('Sorry, there are no images matching your search query. Please try again.');
}