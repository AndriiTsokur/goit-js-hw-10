import fetchCountries from './fetchCountries';
import cleanUpMarkup from './cleanUpMarkup';
import renderMarkup from './renderMarkup';

function handleInput(e) {
	const inputValue = e.target.value.trim();

	if (inputValue.length >= 2) {
		e.target.setAttribute('value', inputValue);
		fetchCountries(inputValue);
	} else {
		cleanUpMarkup();
		renderMarkup([]);
		e.target.setAttribute('value', '');
	}
}

export default handleInput;
