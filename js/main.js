import { fetchData } from './covidData';
import { findFlagUrlByCountryName } from 'country-flags-svg';

fetchData().then((data) => console.log(data));

/* const flagUrl = findFlagUrlByCountryName('Australia');
console.log(flagUrl); */
