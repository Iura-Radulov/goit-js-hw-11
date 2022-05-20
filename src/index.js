import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchPictures } from "./fetchImages";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";



const refs = {
    searchForm: document.querySelector("#search-form"),
    inputEl: document.querySelector("input[name='searchQuery']"),
    gallery: document.querySelector(".gallery"),
    
}
let page = 1;
const perPage = 40;

refs.searchForm.addEventListener("submit", onFormSubmit);

async function onFormSubmit(evt) {
    evt.preventDefault();
    
    const inputValue = refs.inputEl.value;
     evt.currentTarget.reset();
    try {
        
        const pictures = await fetchPictures(inputValue, page, perPage)
         if (pictures.hits.length === 0) {
            Notiflix.Notify.info("Sorry, there are no images matching your search query. Please try again.");
        }
    
        renderDate(pictures);
       
       
    } catch(error) {
        console.log(error);
        
    }
    
}

function renderDate(pictures) {

    const markup = pictures.hits.map((picture) => {
        const { webformatURL, largeImageURL, tags, likes, views, comments, downloads } = picture;
        return `<a class="gallery__item" href="${largeImageURL}">
        <div class="photo-card">
    <img src=${webformatURL} alt=${tags} width="300" loading="lazy" />
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
</div></a>`
    }
    ).join("");
    refs.gallery.innerHTML = markup;

}
// function onTextInput(e) {
//     const inputValue = e.target.value.trim();
//     if (inputValue === "") {
//         clearInterface()
//         return;
//     };

//     fetchCountries(inputValue)
//         .then(renderCountries)
//         .catch(() => {
//             Notiflix.Notify.failure("Oops, there is no country with that name.")
//             clearInterface()
//         });
// }

// function renderCountries(countries) {
    
//     if (countries.length > 10) {
//         clearInterface();
//        return Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
//     };
//     if (countries.length >= 2 & countries.length <= 10) {
//         const markup = countries.map(country => {
//             const { flags, name} = country;
//             return `<li>
//       <img src="${flags.svg}" alt="${name.official}" width="50">
//       <span>${name.official}</span>
//         </li>`
//         }).join("");
//         refs.countryList.innerHTML = markup;
//         refs.countryInfo.innerHTML = "";
//     };

//     if (countries.length === 1) {
//         refs.countryList.innerHTML = "";
//         const markup = countries.map(country => {
//             const { flags, name, capital, population, languages } = country;
//             return `<p>
//       <img src="${flags.svg}" alt="${name.official}" width="70">
//       <h2>${name.official}</h2>
//         </p>
//         <p><b>Capital:</b>${capital}</p>
//         <p><b>Population:</b>${population}</p>
//         <p><b>Languages:</b>${Object.values(languages)}</p>`
//         }).join("");
//         refs.countryInfo.innerHTML = markup;        
//     }
// }

// function clearInterface() {
//     refs.countryList.innerHTML = "";
//     refs.countryInfo.innerHTML = "";
// }