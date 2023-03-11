import { handleClick, handleSubmit } from './eventHandlers';


const form = document.querySelector(".search-form");
const loadMoreBtn = document.querySelector(".load-more");

loadMoreBtn.style.display = "none";


form.addEventListener("submit", handleSubmit);
form.addEventListener("submit", () => loadMoreBtn.style.display = "block");

loadMoreBtn.addEventListener("click", handleClick);



