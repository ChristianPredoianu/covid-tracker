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

  switch (country) {
    case 'S. Korea':
      return findFlagUrlByCountryName('South Korea');
    case 'DPRK':
      return findFlagUrlByCountryName('North Korea');
    case 'Czechia':
      return findFlagUrlByCountryName('Czech Republic');
    case 'Channel Islands':
      return findFlagUrlByCountryName('Jersey');
    case 'Ivory Coast':
      return findFlagUrlByCountryName(`Côte d'Ivoire`);
    case 'DRC':
      return findFlagUrlByCountryName('Democratic Republic of the Congo');
    case 'Eswatini':
      return findFlagUrlByCountryName('Swaziland');
    case 'Cabo Verde':
      return findFlagUrlByCountryName('Cape Verde');
    case 'Faeroe Islands':
      return findFlagUrlByCountryName('Faroe Islands');
    case 'CAR':
      return findFlagUrlByCountryName('Central African Republic');
    case 'St. Vincent Grenadines':
      return findFlagUrlByCountryName('Saint Vincent and the Grenadines');
    case 'Turks and Caicos':
      return findFlagUrlByCountryName('Turks and Caicos Islands');
    case 'St. Barth':
      return findFlagUrlByCountryName('Saint Barthélemy');
    case 'Saint Pierre Miquelon':
      return findFlagUrlByCountryName('Saint Pierre and Miquelon');
    case 'Caribbean Netherlands':
      return findFlagUrlByCountryName('Netherlands Antilles');
    case 'Saint Helena':
      return findFlagUrlByCountryName(
        'Saint Helena, Ascension and Tristan da Cunha'
      );
    case 'World':
      return '../assets/world.png';
    case 'Diamond Princess':
      return '../assets/world.png';
    case 'MS Zaandam':
      return '../assets/world.png';
    case 'Réunion':
      return '../assets/world.png';
    case 'Vatican City':
      return findFlagUrlByCountryName('Holy See');
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
