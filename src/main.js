// // тут уся логіка роботи

import {createMurkup} from './js/render-functions.js';
import { searchObject } from './js/pixabay-api.js';


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

searchForm.addEventListener("submit", handleSubmit);
loadMoreBtn.addEventListener("click", loadMore);

let page = 1;
let pageLimit;
let searchValue;

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
    
    objectList.textContent = "";
    loader.style.display = "flex";
    searchValue = event.currentTarget.elements.search.value.trim();
    page = 1;
    
    searchObject(searchValue, page)
        .then(data => {
            if (!data.total) {
                loader.style.display = "none";
                loadMoreBtn.style.display = "none";

                return iziToast.info({
                    message: "Don't found",
                    closeOnClick: true,
                    position: "topCenter"
                })
            }

            updateMurkup(data.hits);
            event.target.reset();
            loader.style.display = "none";
            loadMoreBtn.style.display = "block";
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




async function loadMore() {  
    
    loader.style.display = "flex";
    page = page + 1;
    
    await searchObject(searchValue, page)
    .then(data => {
        
        updateMurkup(data.hits);
        
        const liElement = document.querySelector('li');
        const { height } = liElement.getBoundingClientRect();
        scrollVertical(height * 2, 0);
        
        searchForm.reset();
        loader.style.display = "none";
        loadMoreBtn.style.display = "block";
        
        pageLimit = Math.floor(data.totalHits / 15);
        
            if (page > pageLimit) {
                loadMoreBtn.style.display = "none";
                iziToast.show({
                    titleColor: 'white',
                    message: `We're sorry, but you've reached the end of search results!`,
                    messageColor: 'black',
                    color: 'blue',
                    position: 'topCenter',
                    timeout: '5000',
                });
            }
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


function updateMurkup(hits) {
        objectList.insertAdjacentHTML('beforeend', createMurkup(hits));
        lightboxGallery.refresh();
}


function scrollVertical(x = 0, y = 0) {
  window.scrollBy({ top: x, left: y, behavior: 'smooth' });
}

