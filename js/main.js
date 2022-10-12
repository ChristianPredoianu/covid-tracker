import { fetchData } from './covidData';
import {
  updateOverviewStats,
  createCountryCards,
  removeCountryCards,
  updateAdditionalInfo,
} from './ui';

function initApp() {
  fetchData().then((data) => {
    updateOverviewStats(data[0]);
    updateAdditionalInfo(data[0]);
    createCountryCards(data);
    addCountryCardEventListener(data);
    filterCountry(data);
    console.log(data);
  });
}

function filterCountry(data) {
  document.getElementById('search-input').addEventListener('keyup', (e) => {
    const searchTerm = e.target.value;

    const filteredCountries = data.filter((country) => {
      return country.country.toLowerCase().startsWith(searchTerm.toLowerCase());
    });
    removeCountryCards();
    createCountryCards(filteredCountries);
    addCountryCardEventListener(data);
  });
}

function addCountryCardEventListener(data) {
  const countryCards = document.querySelectorAll('.country-card');

  countryCards.forEach((countryCard) => {
    countryCard.addEventListener('click', function () {
      const clickedCountry = countryCard.querySelector(
        '.country-card-country__text'
      ).innerText;

      countryCards.forEach((countryCard) => {
        countryCard.classList.remove('active-country-card');
      });

      this.classList.add('active-country-card');

      findClickedCountry(data, clickedCountry);
    });
  });
}

function findClickedCountry(data, clickedCountry) {
  data.find((country) => {
    if (clickedCountry === country.country) {
      updateOverviewStats(country);
      updateAdditionalInfo(country);
    }
  });
}

initApp();
