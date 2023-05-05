import refs from './refs';
import cleanUpMarkup from './cleanUpMarkup';
import showNotification from './showNotification';

function renderMarkup(data) {
	// console.dir(data.length);
	cleanUpMarkup();

	if (data.length === 0) {
		return;
	} else if (data.length > 10) {
		return showNotification('warning');
	} else if (data.length === 1) {
		renderCountryInfo(data);
	} else {
		renderCountriesList(data);
	}
}

function renderCountriesList(apiData) {
	const countriesBundle = apiData
		.map(country => {
			return `<li class="country-item">
						<img class="flag" src="${country.flags.svg}" alt="${country.flags.alt}">
							${country.name.official}
					</li>`;
		})
		.join('');

	return (refs.countryList.innerHTML = countriesBundle);
}

function renderCountryInfo(apiData) {
	return (refs.countryInfo.innerHTML = `<div class="country-info__head">
		<img class="flag" src="${apiData[0].flags.svg}" alt="${apiData[0].flags.alt}">
		<h1 class="country-info__title">${apiData[0].name.official}</h1>
		</div>
		<p class="country-info__text">
			<span class="country-info__bold">Capital: </span>
			${apiData[0].capital}
		</p>
		<p class="country-info__text">
			<span class="country-info__bold">Population: </span>
			${new Intl.NumberFormat('de-DE').format(apiData[0].population)}
		</p>
		<p class="country-info__text">
			<span class="country-info__bold">Languages: </span>
			${Object.values(apiData[0].languages).join(', ')}
		</p>`);
}

export default renderMarkup;
