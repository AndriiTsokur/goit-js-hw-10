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
		refs.countryInfo.innerHTML = `<div class="country-info__head">
		<img class="flag" src="${data[0].flags.svg}" alt="${data[0].flags.alt}">
		<h1 class="country-info__title">${data[0].name.official}</h1>
		</div>
		<p class="country-info__text">
			<span class="country-info__bold">Capital: </span>
			${data[0].capital}
		</p>
		<p class="country-info__text">
			<span class="country-info__bold">Population: </span>
			${new Intl.NumberFormat('de-DE').format(data[0].population)}
		</p>
		<p class="country-info__text">
			<span class="country-info__bold">Languages: </span>
			${Object.values(data[0].languages).join(', ')}
		</p>`;
	} else {
		const countriesBundle = data
			.map(country => {
				return `<li class="country-item">
						<img class="flag" src="${country.flags.svg}" alt="${country.flags.alt}">
							${country.name.official}
					</li>`;
			})
			.join('');

		refs.countryList.innerHTML = countriesBundle;
	}
}

export default renderMarkup;
