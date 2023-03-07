
export function renderImages(images) {

        const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        
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
    
    return markup;
}