import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchPictures } from "./fetchImages";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    searchForm: document.querySelector("#search-form"),
    inputEl: document.querySelector("input[name='searchQuery']"),
    gallery: document.querySelector(".gallery"),
    btnEl: document.querySelector(".load-more"),
    
}
let page = 1;
const perPage = 40;
let inputValue = "";

refs.searchForm.addEventListener("submit", onFormSubmit);

async function onFormSubmit(evt) {
    evt.preventDefault();
    
    inputValue = refs.inputEl.value;
    evt.currentTarget.reset();
    refs.gallery.innerHTML = "";
    page = 1;

    try {        
        const pictures = await fetchPictures(inputValue, page, perPage)
         if (pictures.hits.length === 0) {
            Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
        }
    
        renderDate(pictures);
        loadMore();
        Notiflix.Notify.info(`Hooray! We found ${pictures.total} images.`);
       
    } catch(error) {
        console.log(error);
        
    }
    return inputValue;
}

function renderDate(pictures) {
    const markup = pictures.hits.map((picture) => {
        const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = picture;
        return `<div class="photo-card">
        <a class="gallery__item" href="${largeImageURL}">
    <img src=${webformatURL} alt=${tags} height="240" loading="lazy" /></a>
    <div class="info">
        <p class="info-item">
        <b>Likes</b>: <br> ${likes}
        </p>
        <p class="info-item">
        <b>Views</b>: <br> ${views}
        </p>
        <p class="info-item">
        <b>Comments</b>: <br> ${comments}
        </p>
        <p class="info-item">
        <b>Downloads</b>: <br> ${downloads}
        </p>
  </div>
</div>`
    }
    ).join("");
    refs.gallery.insertAdjacentHTML("beforeend", markup);
    galleryLightBox();
    slowLoad();
}

function loadMore() {
    refs.btnEl.classList.remove("is-hiden");
    page += 1;
    refs.btnEl.addEventListener("click", onLoadMoreBtnSubmit)
}

async function onLoadMoreBtnSubmit() {
    try {        
        const pictures = await fetchPictures(inputValue, page, perPage)
        if (page >= pictures.total / perPage) {
           refs.btnEl.classList.add("is-hiden");  
            Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        }
    
        renderDate(pictures);
        loadMore();
       
    } catch(error) {
        console.log(error);        
    }    
}

function galleryLightBox() {
    let gallery = new SimpleLightbox('.gallery a', {captionsData: "alt", captionDelay: 250});
    gallery.on('show.simplelightbox');
    gallery.refresh();
}

function slowLoad() {
    const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
}