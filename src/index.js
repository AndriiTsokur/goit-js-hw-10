import './css/styles.css';

const refs = {
	input: document.querySelector('#search-box'),
	countryList: document.querySelector('.country-list'),
	countryInfo: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;
const API_URL = 'https://restcountries.com/v3.1/name/';
const filterCountries = 'fields=name,capital,population,flags,languages';

refs.input.addEventListener('input', handleInput);

function handleInput(e) {
	const inputValue = e.target.value.trim();

	if (inputValue.length >= 2) {
		e.target.setAttribute('value', inputValue);

		fetchCountries(inputValue);
	} else {
		cleanUp();
		makeMarkup([]);
		e.target.removeAttribute('value');
	}
}

function fetchCountries(inputValue) {
	fetch(`${API_URL}${inputValue}?${filterCountries}`)
		.then(response => {
			if (!response.ok) {
				throw new Error(response.status);
			}
			return response.json();
		})
		.then(makeMarkup)
		.catch(error => {
			console.log(error);
			console.log('Oops, there is no country with that name');
			cleanUp();
			makeMarkup([]);
		});
}

function makeMarkup(data) {
	console.dir(data.length);

	cleanUp();

	if (data.length > 10) {
		console.log('Too many matches found. Please enter a more specific name.');
	} else if (data.length > 1 && data.length <= 10) {
		// refs.countryInfo.innerHTML = '';
		const countriesBundle = data
			.map(country => {
				return `<li class="country-item">
					<img class="flag" src="${country.flags.svg}" alt="${country.flags.alt}">
						${country.name.official}
				</li>`;
			})
			.join('');

		refs.countryList.innerHTML = countriesBundle;
	} else if (data.length === 1) {
		// refs.countryList.innerHTML = '';
		refs.countryInfo.innerHTML = `<div class="country-info__head">
			<img class="flag" src="${data[0].flags.svg}" alt="${
			data[0].flags.alt
		}"><h1 class="country-info__title">${data[0].name.official}</h1>
			</div>
			<p class="country-info__text">
				<span class="country-info__bold">Capital: </span>
				${data[0].capital}
			</p>
			<p class="country-info__text">
				<span class="country-info__bold">Population: </span>
				${data[0].population}
			</p>
			<p class="country-info__text">
				<span class="country-info__bold">Languages: </span>
				${Object.values(data[0].languages).join(', ')}
			</p>`;
	}
}

function cleanUp() {
	refs.countryList.innerHTML = '';
	refs.countryInfo.innerHTML = '';
}
