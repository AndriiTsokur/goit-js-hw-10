import showNotification from './showNotification';
import cleanUpMarkup from './cleanUpMarkup';
import renderMarkup from './renderMarkup';

function fetchCountries(inputValue) {
	const API_URL = 'https://restcountries.com/v3.1/name/';
	const filterCountries = 'fields=name,capital,population,flags,languages';

	fetch(`${API_URL}${inputValue}?${filterCountries}`)
		.then(response => {
			if (!response.ok) {
				throw new Error(response.status);
			}
			return response.json();
		})
		.then(renderMarkup)
		.catch(error => {
			console.log(error);
			showNotification('error');
			cleanUpMarkup();
			renderMarkup([]);
		});
}

export default fetchCountries;
