import { handleSubmit } from './eventHandlers';
import { loadMore } from './eventHandlers';

const form = document.querySelector(".search-form");
const loadMoreBtn = document.querySelector(".load-more");




form.addEventListener("submit", handleSubmit);
loadMoreBtn.addEventListener("click", loadMore)



