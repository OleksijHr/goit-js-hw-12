// // тут уся логіка роботи

import * as renderFunction from './js/render-functions.js';
import * as pixabayApi from './js/pixabay-api.js';


// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


// Описаний у документації
import simpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";


const searchForm = document.querySelector(".search-form");
const search = document.querySelector("input");
const objectList = document.querySelector(".object-list");
const loader = document.querySelector(".loader-box");
const loadMoreBtn = document.querySelector(".load-more-btn");
const lightboxGallery = new simpleLightbox('.gallery a', {
    caption: true,
    captionsData: 'alt',
    captionDelay: 250,
    showCounter: false
});
let page = 1;

searchForm.addEventListener("submit", handleSubmit);
loadMoreBtn.addEventListener("click", loadMore);

function handleSubmit(event) {
    event.preventDefault();
    
    if (!search.value) {
        return iziToast.error({
            message: "Sorry, there are no images matching your search query. Please try again!",
            backgroundColor: "red",
            closeOnClick: true,
            position: "topCenter"
        });
    }
    
    loader.style.display = "flex";

    const searchValue = event.currentTarget.elements.search.value.trim();
    
    pixabayApi.searchObject(searchValue, page)
    .then(data => {
            if (!data.total) {
                loader.style.display = "none";

                return iziToast.info({
                    message: "Don't found",
                    closeOnClick: true,
                    position: "topCenter"
                })
            }

            updateMurkup(data.hits);
            searchForm.reset();

            if ((page*15) <= data.totalHits) {
                loadMoreBtn.style.display = "flex";
            }

            loader.style.display = "none";
        })
        .catch(error => {
            loader.style.display = "none";
            return iziToast.error({
                message: `${error.message}`,
                backgroundColor: "red",
                position: "topCenter"
            })
        })
}




async function loadMore(searchValue) {
    loader.style.display = "flex";

    page++;

    loadMoreBtn.disabled = true;

    try {
        const data = await pixabayApi.searchObject( page);
        updateMurkup(data.hits);
        
        // loadMoreBtn.disabled = false;
        loader.style.display = "none";

        
        if ((page * 15) > data.totalHits) {
            loadMoreBtn.style.display = "none";
        }
    } catch (error) {
        loader.style.display = "none";
        return iziToast.error({
            message: `${error.message}`,
            backgroundColor: "red",
            position: "topCenter"
        })
    }
}


function updateMurkup (hits) {
        objectList.insertAdjacentHTML('beforeend', renderFunction.createMurkup(hits));
        lightboxGallery.refresh();
}
