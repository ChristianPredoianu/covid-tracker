import { findFlagUrlByCountryName } from 'country-flags-svg';

export function updateOverviewStats(country) {
  document.getElementById('global-stats-country').innerText = formatNumber(
    country.country
  );
  document.getElementById('global-stats-cases').innerText = formatNumber(
    country.cases
  );
  document.getElementById('global-stats-recovered').innerText = formatNumber(
    country.recovered
  );
  document.getElementById('global-stats-deaths').innerText = formatNumber(
    country.deaths
  );
}

export function updateAdditionalInfo(country) {
  document.getElementById('additional-info-cases').innerText = formatNumber(
    country.todayCases
  );
  document.getElementById('additional-info-deaths').innerText = formatNumber(
    country.todayDeaths
  );
  document.getElementById('additional-info-intensive').innerText = formatNumber(
    country.critical
  );
  document.getElementById('additional-info-cases-million').innerText =
    formatNumber(country.casesPerOneMillion);
  document.getElementById('additional-info-deaths-million').innerText =
    formatNumber(country.deathsPerOneMillion);
  document.getElementById('additional-info-cases-active').innerText =
    formatNumber(country.active);
}

export function createCountryCards(data) {
  const countryCardsDiv = document.getElementById('country-cards');

  const firstTenCountries = data.slice(0, 10);

  firstTenCountries.forEach((country) => {
    const countryCardDiv = document.createElement('div');
    countryCardDiv.className = 'country-card';

    const countryCardCountry = document.createElement('div');
    countryCardCountry.className = 'country-card-country';

    const countryCardFlag = document.createElement('img');
    countryCardFlag.className = 'country-card-country__flag';
    countryCardFlag.src = setCountryFlagSrc(country.country);
    countryCardFlag.alt = 'flag';

    const countryCardText = document.createElement('p');
    countryCardText.className = 'country-card-country__text';
    countryCardText.innerText = country.country;

    const countryValue = document.createElement('p');
    countryValue.className = 'country-card__value';
    countryValue.innerText = formatNumber(country.cases);

    countryCardsDiv.appendChild(countryCardDiv);
    countryCardDiv.appendChild(countryCardCountry);
    countryCardCountry.appendChild(countryCardText);
    countryCardCountry.insertBefore(countryCardFlag, countryCardText);
    countryCardDiv.appendChild(countryValue);
  });
}

// Non corresponding country names from covid api(no iso code) & flags api
function setCountryFlagSrc(country) {
  let flagUrl = findFlagUrlByCountryName(country);

  const worldImgUrl = new URL('/world.png', import.meta.url).href;

  switch (country) {
    case 'S. Korea':
      flagUrl = findFlagUrlByCountryName('South Korea');
      break;
    case 'DPRK':
      flagUrl = findFlagUrlByCountryName('North Korea');
      break;
    case 'Czechia':
      flagUrl = findFlagUrlByCountryName('Czech Republic');
      break;
    case 'Channel Islands':
      flagUrl = findFlagUrlByCountryName('Jersey');
      break;
    case 'Ivory Coast':
      flagUrl = findFlagUrlByCountryName(`Côte d'Ivoire`);
      break;
    case 'DRC':
      flagUrl = findFlagUrlByCountryName('Democratic Republic of the Congo');
      break;
    case 'Eswatini':
      flagUrl = findFlagUrlByCountryName('Swaziland');
      break;
    case 'Cabo Verde':
      flagUrl = findFlagUrlByCountryName('Cape Verde');
      break;
    case 'Faeroe Islands':
      flagUrl = findFlagUrlByCountryName('Faroe Islands');
      break;
    case 'CAR':
      flagUrl = findFlagUrlByCountryName('Central African Republic');
      break;
    case 'St. Vincent Grenadines':
      flagUrl = findFlagUrlByCountryName('Saint Vincent and the Grenadines');
      break;
    case 'Turks and Caicos':
      flagUrl = findFlagUrlByCountryName('Turks and Caicos Islands');
      break;
    case 'St. Barth':
      flagUrl = findFlagUrlByCountryName('Saint Barthélemy');
      break;
    case 'Saint Pierre Miquelon':
      flagUrl = findFlagUrlByCountryName('Saint Pierre and Miquelon');
      break;
    case 'Caribbean Netherlands':
      flagUrl = findFlagUrlByCountryName('Netherlands Antilles');
      break;
    case 'Saint Helena':
      flagUrl = findFlagUrlByCountryName(
        'Saint Helena, Ascension and Tristan da Cunha'
      );
      break;
    case 'World':
      flagUrl = worldImgUrl;
      break;
    case 'Diamond Princess':
      flagUrl = worldImgUrl;
      break;
    case 'MS Zaandam':
      flagUrl = worldImgUrl;
      break;
    case 'Réunion':
      flagUrl = worldImgUrl;
      break;
    case 'Vatican City':
      flagUrl = findFlagUrlByCountryName('Holy See');
      break;
  }

  return flagUrl;
}

export function removeCountryCards() {
  const countryCardsDiv = document.querySelectorAll('.country-card');

  countryCardsDiv.forEach((countryCard) => {
    countryCard.remove();
  });
}

function formatNumber(num) {
  return num.toLocaleString('en-US');
}
