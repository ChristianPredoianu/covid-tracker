import { fetchData } from './covidData';
import {
  updateOverviewStats,
  createCountryCards,
  removeCountryCards,
  updateAdditionalInfo,
} from './ui';
import { faqData } from './faqData';

const faqBtns = document.querySelectorAll('.faq-btn');
const faqParagraph = document.getElementById('faq-paragraph');

function initApp() {
  fetchData().then((data) => {
    updateOverviewStats(data[0]);
    updateAdditionalInfo(data[0]);
    createCountryCards(data);
    addCountryCardEventListener(data);
    filterCountry(data);
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

function changeFaqParagraph() {
  let faqBtnValue = this.innerText;

  addActiveFaqBtn(this);

  switch (faqBtnValue) {
    case 'Covid-19':
      faqParagraph.innerText = faqData.covid19;
      break;
    case 'How it spreads':
      faqParagraph.innerText = faqData.spreads;
      break;
    case 'How to protect yourself':
      faqParagraph.innerText = faqData.protect;
      break;
    case 'Symptoms & testing':
      faqParagraph.innerText = faqData.symptoms;
      break;
    case 'Community':
      faqParagraph.innerText = faqData.community;
      break;
  }
}

function addActiveFaqBtn(btn) {
  faqBtns.forEach((faqBtn) => {
    faqBtn.classList.remove('active-faq-btn');
    btn.classList.add('active-faq-btn');
  });
}

faqBtns.forEach((faqBtn) => {
  faqBtn.addEventListener('click', changeFaqParagraph);
});

initApp();
