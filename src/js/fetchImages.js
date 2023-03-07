export function fetchImages(userInput, page) {
    
  const params = new URLSearchParams({
    
    key: "34183438-5ac415132938cde4893c052fd",
    q: userInput,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: "true",
    per_page: "40",
    page: page

  });

  return fetch(`https://pixabay.com/api/?${params}`).then(
    (response) => {
      if (!response.ok) {
          throw new Error(response.status);
      }
      return response.json();
    }
  );
}