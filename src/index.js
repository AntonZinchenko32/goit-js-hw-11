import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchImages } from './fetchImages';

const form = document.querySelector(".search-form");

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  
    const {
    elements: { searchQuery }
  } = event.currentTarget;

    fetchImages(searchQuery.value)
    .then((images) => console.log(images))
    .catch((error) => { console.log(error); Notify.failure('Oops, there is no images with that name');});

    event.currentTarget.reset();
}