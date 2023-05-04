import refs from './refs';

function cleanUpMarkup() {
	refs.countryList.textContent = '';
	refs.countryInfo.textContent = '';
}

export default cleanUpMarkup;
