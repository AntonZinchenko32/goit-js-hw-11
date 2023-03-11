import { handleClick, handleSubmit } from './eventHandlers';


const form = document.querySelector(".search-form");

export const loadMoreBtn = document.querySelector(".load-more");


form.addEventListener("submit", handleSubmit);
loadMoreBtn.addEventListener("click", handleClick);



