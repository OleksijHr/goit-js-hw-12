// У файлі pixabay-api.js зберігай функції для HTTP-запитів.

import axios from "axios";

// тут функції для HTTP запитів


// const BASE_URL = "https://pixabay.com/api/";
// const API_KEY = "43211197-e02e136a3ee46bcda7d5bf66f";

// export function searchObject(searchName = "") {
//     const params = new URLSearchParams({
//         key: API_KEY,
//         q: searchName,
//         image_type: "photo",
//         orientation: "horizontal",
//         safesearch: true
//     });

//     return fetch(`${BASE_URL}/?${params}`)
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(response.status);
//             }
//             return response.json();
//     })
// };


const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "43211197-e02e136a3ee46bcda7d5bf66f";




export async function searchObject(searchName, page = 1) {
    const { data } = await axios(`${BASE_URL}`, {
        params: {
            key: API_KEY,
            q: searchName,
            image_type: "photo",
            orientation: "horizontal",
            safesearch: true,
            per_page: 15,
            page
        }
    })
    return data;
};