// У файлі render-functions.js створи функції для відображення елементів інтерфейсу.

export const createMurkup =  function (objArr) {

    return objArr.map(({ views, comments, downloads, likes, webformatURL, tags, largeImageURL }) => {
        return `<li>
        <div class="img-box">
        <a href="${largeImageURL}">
        <img class="img" src="${webformatURL}" alt="${tags}" width="360" height="200">
        </a>
        <ul class="value-list">
        <li class="likes value-item"><p class="article">Likes</p><p class="value">${likes}</p></li>
        <li class="views value-item" ><p class="article">Views</p><p class="value">${views}</p></li>
        <li class="comments value-item"><p class="article">Comments</p><p class="value">${comments}</p></li>
        <li class="downloads value-item"><p class="article">Downloads</p><p class="value">${downloads}</p></li>
        </ul></div>
        </li>`
    }).join("");
};
