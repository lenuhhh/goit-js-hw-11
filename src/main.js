import {createMarkup, addMarkup } from "./js/render-functions";
import fetchPhotos from "./js/pixabay-api";
import errorSvg from './img/error.svg'
import iziToast from 'izitoast';
import simpleLightbox from "simplelightbox";


const form = document.querySelector('form')
const loader = document.querySelector('.loader-css')
const galleryLook = new simpleLightbox('.gallery a')

formNew.addEventListener("submit", (event) => {
    event.preventDefault();
    
    photoList.innerHTML = ""; // Очистка галереи перед новым поиском
    loading.classList.remove("visually-hidden"); // Показываем спиннер

    const query = inputSearch.value.trim();
    if (query !== "") {
        fetchPhotos(query)
            .then((photos) => {
                loading.classList.add("visually-hidden"); // Скрываем спиннер
                if (photos.length > 0) {
                    renderUsers(photos, photoList); // Рендерим фото
                    lightbox.refresh(); // Обновляем SimpleLightbox
                } else {
                    iziToast.error({
                        title: 'Error',
                        message: 'Sorry, there are no images matching your search query. Please try again!',
                        position: 'topRight'
                    });
                }
            })
            .catch((error) => {
                loading.classList.add("visually-hidden");
                iziToast.error({
                    title: 'Error',
                    message: 'Error fetching images. Try again later.',
                    position: 'topRight'
                });
                console.error(error);
            });
    } else {
        loading.classList.add("visually-hidden");
        iziToast.error({
            title: 'Error',
            message: 'Please enter a search term!',
            position: 'topRight'
        });
    }
});
