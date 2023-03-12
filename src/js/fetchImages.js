export async function fetchImages(userInput, page) {
    
  const params = new URLSearchParams({
    
    key: "34183438-5ac415132938cde4893c052fd",
    q: userInput,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    per_page: "40",
    page: page

  });

  const results = await fetch(`https://pixa23bay.com/api/?${params}`);
  const hits = await results.json();

  return hits;
  }