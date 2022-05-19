import './css/styles.css';
import Notiflix from 'notiflix';
import { PictureApiService } from "./fetchImages";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";



const refs = {
    searchForm: document.querySelector("#search-form"),
    gallery: document.querySelector(".gallery"),
    
}

const pictureApiService = new PictureApiService()
pictureApiService.fetchPictures()
// refs.searchBox.addEventListener("input", debounce(onTextInput, DEBOUNCE_DELAY));

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